import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { ServiceCenterService } from "../server/ServiceCenterService";
import { serviceAreaInputSchema } from "../validation/inputSchema";
import { IGeoFenceData } from "../types/ServiceContracts";

/**
 * Standardized response structure for Server Actions
 */
export type ServiceAreaActionResponse = {
  success: boolean;
  message?: string;
  data?: IGeoFenceData;
  error?: string;
  validationErrors?: Record<string, string[] | undefined>;
};

/**
 * Server Action to update the geographic service area for a Service Center.
 * Handles validation, business logic delegation to the domain service, and cache revalidation.
 * 
 * @param serviceCenterId - Unique identifier of the service center
 * @param rawData - Unvalidated input data containing GeoJSON and postal codes
 * @returns Promise<ServiceAreaActionResponse>
 */
export async function updateServiceAreaAction(
  serviceCenterId: string,
  rawData: unknown
): Promise<ServiceAreaActionResponse> {
  try {
    // 1. Validate Input using Level 0 Zod Schema
    // This ensures data integrity before it reaches the domain layer
    const validatedData = serviceAreaInputSchema.parse(rawData);

    // 2. Delegate to Level 2 Domain Service
    // The ServiceCenterService encapsulates the interaction with the API Gateway/Backend
    const service = new ServiceCenterService();
    
    // Construct the DTO required by the service layer
    const updateDto: IGeoFenceData = {
      serviceCenterId,
      geoJson: validatedData.geoJson,
      postalCodes: validatedData.postalCodes,
    };

    const result = await service.updateServiceArea(serviceCenterId, updateDto);

    // 3. Revalidate Next.js Cache
    // This ensures that the next page load reflects the updated map data immediately
    revalidatePath(`/admin/service-centers/${serviceCenterId}`);
    revalidatePath("/admin/service-centers");

    // 4. Return Success Response
    return {
      success: true,
      message: "Service area updated successfully.",
      data: result,
    };

  } catch (error) {
    console.error("[UpdateServiceAreaAction] Error:", error);

    // 5. Handle Validation Errors
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
        error: "Validation failed. Please check the input data.",
        validationErrors: fieldErrors,
      };
    }

    // 6. Handle Service/API Errors
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while updating the service area.";
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}