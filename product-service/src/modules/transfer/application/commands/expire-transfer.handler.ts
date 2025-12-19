import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ITransferRepository } from '../../domain/ports/transfer.repository.port';
import { IMessagePublisher } from '../../../../shared/infrastructure/messaging/azure-service-bus.publisher';
import { TransferStatus } from '../../domain/enums/transfer-status.enum';

export class ExpireTransferCommand {
    constructor(
        // Optional override for testing time travel, defaults to current time
        public readonly referenceDate: Date = new Date()
    ) {}
}

@CommandHandler(ExpireTransferCommand)
export class ExpireTransferHandler implements ICommandHandler<ExpireTransferCommand> {
    private readonly logger = new Logger(ExpireTransferHandler.name);
    private readonly EXPIRATION_HOURS = 72;

    constructor(
        @Inject('ITransferRepository')
        private readonly transferRepository: ITransferRepository,
        @Inject('IMessagePublisher')
        private readonly messagePublisher: IMessagePublisher,
    ) {}

    async execute(command: ExpireTransferCommand): Promise<void> {
        this.logger.log('Starting transfer expiration job...');
        
        const thresholdDate = new Date(command.referenceDate.getTime() - (this.EXPIRATION_HOURS * 60 * 60 * 1000));
        
        // REQ-BR-002: Find pending transfers older than 72 hours
        // Using the interface method findExpiredPending defined in thinking process
        const expiredTransfers = await this.transferRepository.findExpiredPending(thresholdDate);

        this.logger.log(`Found ${expiredTransfers.length} transfers to expire.`);

        for (const transfer of expiredTransfers) {
            try {
                // Update status
                // Assuming domain entity has a method or public property
                // If entity method exists: transfer.expire();
                // Otherwise:
                transfer.status = TransferStatus.Expired; // Using enum from Level 0
                transfer.updatedAt = new Date();

                await this.transferRepository.save(transfer);

                // Publish event to notify users and un-pause service requests
                await this.messagePublisher.publish('transfer.expired', {
                    transferId: transfer.id,
                    productId: transfer.productId,
                    fromUserId: transfer.fromUserId,
                    toEmail: transfer.toEmail,
                    expiredAt: transfer.updatedAt.toISOString(),
                });

                this.logger.debug(`Expired transfer ${transfer.id}`);
            } catch (error) {
                this.logger.error(`Failed to expire transfer ${transfer.id}`, error instanceof Error ? error.stack : String(error));
                // Continue processing other records even if one fails
            }
        }

        this.logger.log('Transfer expiration job completed.');
    }
}