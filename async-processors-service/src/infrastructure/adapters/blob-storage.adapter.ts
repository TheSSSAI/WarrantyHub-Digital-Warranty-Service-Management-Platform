import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

/**
 * Adapter to interact with Azure Blob Storage.
 * Responsible for securely retrieving invoice files to be processed by OCR.
 */
@Injectable()
export class BlobStorageAdapter {
  private readonly logger = new Logger(BlobStorageAdapter.name);
  private blobServiceClient: BlobServiceClient;
  private containerName: string;

  constructor(private readonly configService: ConfigService) {
    this.initializeClient();
  }

  private initializeClient() {
    const connectionString = this.configService.get<string>(
      'AZURE_STORAGE_CONNECTION_STRING',
    );
    this.containerName =
      this.configService.get<string>('AZURE_STORAGE_INVOICE_CONTAINER') ||
      'invoices';

    if (!connectionString) {
      this.logger.error(
        'Azure Storage connection string is missing. File retrieval will fail.',
      );
      throw new Error('Azure Storage Configuration missing');
    }

    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
  }

  /**
   * Retrieves a readable stream for a specific blob.
   * @param blobPath The relative path or name of the blob in the container.
   * @returns A NodeJS ReadableStream of the file content.
   */
  public async getFileStream(blobPath: string): Promise<NodeJS.ReadableStream> {
    try {
      // Ensure we have the container client
      const containerClient: ContainerClient =
        this.blobServiceClient.getContainerClient(this.containerName);

      // Sanitize blob path (remove container name if present in path)
      const sanitizedBlobName = this.sanitizeBlobPath(blobPath);

      this.logger.debug(
        `Attempting to download blob: ${sanitizedBlobName} from container: ${this.containerName}`,
      );

      const blobClient = containerClient.getBlobClient(sanitizedBlobName);

      // Check existence
      const exists = await blobClient.exists();
      if (!exists) {
        this.logger.warn(`Blob not found: ${sanitizedBlobName}`);
        throw new NotFoundException(`File not found: ${sanitizedBlobName}`);
      }

      // Download
      const downloadBlockBlobResponse = await blobClient.download();

      if (!downloadBlockBlobResponse.readableStreamBody) {
        throw new Error(
          `Failed to retrieve readable stream for blob: ${sanitizedBlobName}`,
        );
      }

      return downloadBlockBlobResponse.readableStreamBody;
    } catch (error) {
      this.logger.error(
        `Error downloading blob ${blobPath}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Helper to clean up input paths.
   * If the event sends a full URL, we extract just the blob name.
   */
  private sanitizeBlobPath(inputPath: string): string {
    try {
      // Check if it's a URL
      if (inputPath.startsWith('http')) {
        const url = new URL(inputPath);
        const pathParts = url.pathname.split('/');
        // Assuming structure /containerName/blobName
        // If container name matches, return the rest
        if (pathParts.length > 2 && pathParts[1] === this.containerName) {
          return decodeURIComponent(pathParts.slice(2).join('/'));
        }
        // If not matching container structure, return last segment
        return decodeURIComponent(pathParts[pathParts.length - 1]);
      }
      return inputPath;
    } catch {
      return inputPath;
    }
  }
}