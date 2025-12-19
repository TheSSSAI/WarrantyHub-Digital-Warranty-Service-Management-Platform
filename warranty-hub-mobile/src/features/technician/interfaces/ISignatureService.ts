/**
 * Interface for Digital Signature Management.
 * Handles the capture, temporary storage, and retrieval of customer signatures
 * for job completion (REQ-FUNC-010).
 */
export interface ISignatureService {
  /**
   * Saves a captured signature image to the local file system securely.
   * 
   * @param base64Data The raw base64 string of the signature image (usually PNG)
   * @param ticketId The unique identifier of the service request ticket
   * @returns Promise resolving to the local file path (URI) of the saved image
   */
  saveSignatureLocal(base64Data: string, ticketId: string): Promise<string>;

  /**
   * Retrieves the local file URI for a specific ticket's signature.
   * 
   * @param ticketId The unique identifier of the service request ticket
   * @returns Promise resolving to the file URI, or null if not found
   */
  getSignatureUri(ticketId: string): Promise<string | null>;

  /**
   * Deletes the locally stored signature for a ticket.
   * Used for cleanup after successful sync or if the user clears the signature.
   * 
   * @param ticketId The unique identifier of the service request ticket
   */
  deleteSignatureLocal(ticketId: string): Promise<void>;

  /**
   * Checks if a signature exists for the given ticket.
   * 
   * @param ticketId The unique identifier of the service request ticket
   */
  hasSignature(ticketId: string): Promise<boolean>;

  /**
   * Compresses the signature image to optimize for upload.
   * 
   * @param uri The local URI of the image
   * @param quality Quality factor (0-100)
   * @returns Promise resolving to the base64 string of the compressed image
   */
  compressSignature(uri: string, quality?: number): Promise<string>;
}