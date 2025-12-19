import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResilienceModule } from '../../common/resilience/resilience.module';
import { HttpClientModule } from '../../infrastructure/http/http-client.module';
import { DocumentIntelligenceAdapter } from '../../infrastructure/adapters/document-intelligence.adapter';
import { BlobStorageAdapter } from '../../infrastructure/adapters/blob-storage.adapter';
import { OcrProcessorService } from './ocr-processor.service';
import { InvoiceEventHandler } from './invoice-event.handler';
import { OCR_PROVIDER } from './ocr.constants';

/**
 * OcrModule
 * 
 * Configures the dependencies and providers required for the Optical Character Recognition (OCR)
 * worker process. This module adheres to Clean Architecture by binding infrastructure adapters
 * to domain interfaces and wiring up the event-driven architecture components.
 * 
 * @module
 */
@Module({
  imports: [
    // Configuration for external service credentials (Azure AI, Blob Storage)
    ConfigModule,
    
    // Resilience patterns (Circuit Breaker) for external API calls
    ResilienceModule,
    
    // HTTP Client for communicating with the Product Service API
    HttpClientModule,
  ],
  providers: [
    // Infrastructure Adapters
    BlobStorageAdapter,
    
    // Domain Services
    OcrProcessorService,
    
    // Event Handlers (Entry Point)
    InvoiceEventHandler,
    
    // Dependency Injection Binding for IOcrProvider
    // Binds the abstract interface token to the concrete Azure implementation
    {
      provide: OCR_PROVIDER,
      useClass: DocumentIntelligenceAdapter,
    },
  ],
  exports: [
    // Exporting the processor allows for potential reuse or testing isolation
    OcrProcessorService,
  ],
})
export class OcrModule {}