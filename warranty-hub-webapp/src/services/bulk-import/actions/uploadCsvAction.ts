import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { ApiClient } from "@/lib/api/ApiClient";
import { bulkImportSchema } from "../validation/inputSchema";

export type UploadCsvActionResponse = {
  success: boolean;
  jobId?: string;
  message?: string;
  error?: string;
  validationErrors?: Record<string, string[] | undefined>;
};

/**
 * Server Action for handling CSV bulk import uploads.
 * Validates file constraints and streams the file to the API Gateway using FormData.
 * 
 * @param formData - The FormData object containing the 'file' and 'importType'
 * @returns Promise<UploadCsvActionResponse>
 */
export async function uploadCsvAction(formData: FormData): Promise<UploadCsvActionResponse> {
  try {
    // 1. Extract and Structure Input
    const file = formData.get("file") as File | null;
    const importType = formData.get("importType") as string;
    const isDryRun = formData.get("isDryRun") === "true";

    const rawInput = {
      file,
      importType,
      isDryRun
    };

    // 2. Validate Input using Level 0 Zod Schema
    // Validates file existence, size limits, MIME types, and valid import types
    const validatedInput = bulkImportSchema.parse(rawInput);

    // 3. Construct Payload for API Gateway
    // We recreate FormData to ensure clean headers and structure for the downstream API request
    const apiPayload = new FormData();
    apiPayload.append("file", validatedInput.file);
    apiPayload.append("type", validatedInput.importType);
    apiPayload.append("dryRun", String(validatedInput.isDryRun));

    // 4. Execute API Request via Level 1 ApiClient
    // We post directly to the gateway as there is no intermediate Level 2 service for file streaming
    const apiClient = ApiClient.getInstance();
    
    // Using a specific endpoint for bulk uploads. 
    // The ApiClient must handle the 'multipart/form-data' content type automatically when passing FormData
    const response = await apiClient.post<{ jobId: string }>(
      "/api/v1/admin/bulk-import/upload", 
      apiPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // 5. Revalidate Admin Dashboard
    // Updates the import history list view
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/data-management");

    return {
      success: true,
      message: validatedInput.isDryRun 
        ? "Dry run initiated successfully." 
        : "Import job queued successfully.",
      jobId: response.jobId,
    };

  } catch (error) {
    console.error("[UploadCsvAction] Error:", error);

    // 6. Handle Validation Errors
    if (error instanceof ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((e) => {
        const key = e.path.join(".") || "file";
        if (!errors[key]) errors[key] = [];
        errors[key]?.push(e.message);
      });

      return {
        success: false,
        error: "Invalid file or parameters.",
        validationErrors: errors,
      };
    }

    // 7. Handle API Errors
    // The ApiClient throws errors for non-2xx responses
    const errorMessage = error instanceof Error ? error.message : "Failed to upload CSV file.";
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}