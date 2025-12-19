import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { ApiClient } from "@/lib/api/ApiClient";
import { productRegistrationSchema } from "../validation/productSchema";
import { IProductDto } from "../types/ProductContracts";

export type RegisterProductActionResponse = {
  success: boolean;
  data?: IProductDto;
  message?: string;
  error?: string;
  validationErrors?: Record<string, string[] | undefined>;
};

/**
 * Server Action for registering a new consumer product.
 * Handles validation of product details (serial number, purchase date) and persists data via the API Gateway.
 * 
 * @param rawData - The raw input data from the product registration form
 * @returns Promise<RegisterProductActionResponse>
 */
export async function registerProductAction(rawData: unknown): Promise<RegisterProductActionResponse> {
  try {
    // 1. Validate Input using Level 0 Zod Schema
    // Checks for required fields, date validity (no future dates), and serial number formats
    const validatedData = productRegistrationSchema.parse(rawData);

    // 2. Prepare Data for API
    // Ensure dates are serialized correctly for the backend
    const payload = {
      ...validatedData,
      purchaseDate: validatedData.purchaseDate.toISOString(),
      // If invoiceId was uploaded separately, it should be included in the rawData/schema
      invoiceId: (rawData as any).invoiceId, 
    };

    // 3. Execute API Request via Level 1 ApiClient
    // Direct communication with the Product Service via Gateway
    const apiClient = ApiClient.getInstance();
    
    const response = await apiClient.post<IProductDto>(
      "/api/v1/products",
      payload
    );

    // 4. Revalidate Consumer Pages
    // Refresh the product list and dashboard to show the newly added item
    revalidatePath("/dashboard");
    revalidatePath("/products");

    return {
      success: true,
      message: "Product registered successfully.",
      data: response,
    };

  } catch (error) {
    console.error("[RegisterProductAction] Error:", error);

    // 5. Handle Schema Validation Errors
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join(".");
        if (!fieldErrors[path]) {
          fieldErrors[path] = [];
        }
        fieldErrors[path]?.push(err.message);
      });

      return {
        success: false,
        error: "Please correct the errors in the form.",
        validationErrors: fieldErrors,
      };
    }

    // 6. Handle Backend API Errors
    // Specifically check for common issues like duplicate serial numbers
    let errorMessage = "An unexpected error occurred during registration.";
    
    if (error instanceof Error) {
      // Map common API error codes to user-friendly messages if needed
      // (Assuming ApiClient creates Error objects with the server message)
      if (error.message.includes("409")) {
        errorMessage = "A product with this serial number is already registered.";
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}