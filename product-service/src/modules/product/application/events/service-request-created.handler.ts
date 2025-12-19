import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ProductEntity } from '../../domain/product.entity';

// Defining the event locally or importing from shared kernel if available
// For this generation, we assume the event class structure
export class ServiceRequestCreatedEvent {
    constructor(
        public readonly serviceRequestId: string,
        public readonly productId: string,
        public readonly userId: string,
        public readonly timestamp: Date,
    ) {}
}

@EventsHandler(ServiceRequestCreatedEvent)
export class ServiceRequestCreatedHandler implements IEventHandler<ServiceRequestCreatedEvent> {
    private readonly logger = new Logger(ServiceRequestCreatedHandler.name);

    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: { 
            findById(id: string): Promise<ProductEntity | null>; 
            save(product: ProductEntity): Promise<ProductEntity>;
        },
    ) {}

    async handle(event: ServiceRequestCreatedEvent): Promise<void> {
        const { productId, serviceRequestId } = event;
        this.logger.log(`Handling ServiceRequestCreatedEvent for product: ${productId}, request: ${serviceRequestId}`);

        try {
            const product = await this.productRepository.findById(productId);

            if (!product) {
                this.logger.warn(`Product ${productId} not found during ServiceRequestCreatedEvent handling. Skipping lock.`);
                return;
            }

            if (product.isLocked) {
                this.logger.debug(`Product ${productId} is already locked. No action needed.`);
                return;
            }

            // Enforce REQ-BR-001: Lock product details after first service request
            product.lock();

            await this.productRepository.save(product);
            this.logger.log(`Product ${productId} locked successfully due to Service Request ${serviceRequestId}`);
            
        } catch (error) {
            this.logger.error(`Failed to lock product ${productId} on ServiceRequestCreatedEvent`, error instanceof Error ? error.stack : String(error));
            // In a production event-driven system, we might want to throw here to trigger a retry mechanism
            // depending on the idempotency strategy of the message broker.
            throw error;
        }
    }
}