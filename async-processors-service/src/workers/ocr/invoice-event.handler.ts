import { Injectable, Logger } from '@nestjs/common';
import { Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { IMessageHandler } from '../../common/interfaces/message-handler.interface';
import { InvoiceUploadedEvent } from './dto/invoice-uploaded-event.dto';
import { OcrProcessorService } from './ocr-processor.service';

/**
 * Event Handler for Invoice Uploaded Events.
 * 
 * This handler acts as the entry point for the OCR processing workflow.
 * It consumes messages from the 'invoice-uploaded' queue/topic and delegates
 * the business logic to the OcrProcessorService.
 * 
 * It implements the Competting Consumers pattern by processing messages statelessly.
 * It ensures reliability by handling exceptions which triggers the message broker's
 * retry mechanism (e.g., Azure Service Bus Peek-Lock).
 */
@Injectable()
export class InvoiceEventHandler implements IMessageHandler<InvoiceUploadedEvent> {
    private readonly logger = new Logger(InvoiceEventHandler.name);

    constructor(
        private readonly ocrProcessor: OcrProcessorService
    ) {}

    /**
     * Handles the incoming invoice uploaded event.
     * 
     * @param event The typed event payload containing invoice details.
     * @param context The execution context from the message broker (e.g., Service Bus context).
     * @returns Promise<void>
     * @throws Error if processing fails, triggering a retry in the messaging infrastructure.
     */
    public async handle(@Payload() event: InvoiceUploadedEvent, @Ctx() context: RmqContext): Promise<void> {
        this.logger.log(`Received invoice uploaded event for InvoiceID: ${event.invoiceId}`);

        try {
            // Validate payload existence
            if (!event || !event.invoiceId || !event.blobPath) {
                this.logger.error('Invalid event payload received. Missing required fields.');
                // In a production scenario, we might dead-letter this immediately 
                // rather than throwing, to prevent infinite loops on bad data.
                // For this implementation, we log and return to acknowledge processing 
                // so it doesn't block the queue.
                return;
            }

            // Delegate core business logic to the processor service
            // The processor handles:
            // 1. Downloading the file via BlobStorageAdapter
            // 2. OCR Analysis via DocumentIntelligenceAdapter (wrapped in Circuit Breaker)
            // 3. Updating ProductService via ProductServiceClient
            await this.ocrProcessor.processInvoice(event);

            this.logger.log(`Successfully processed OCR for InvoiceID: ${event.invoiceId}`);
            
            // If using manual acknowledgement (Peek-Lock), it would happen here.
            // NestJS auto-ack is assumed enabled for this configuration.

        } catch (error) {
            this.logger.error(
                `Failed to process invoice event for InvoiceID: ${event.invoiceId}`,
                error instanceof Error ? error.stack : JSON.stringify(error)
            );

            // Re-throwing the error signals the message broker (Azure Service Bus) 
            // that processing failed. The broker will then apply its retry policy 
            // or move the message to the Dead Letter Queue (DLQ) if max delivery count is reached.
            throw error;
        }
    }
}