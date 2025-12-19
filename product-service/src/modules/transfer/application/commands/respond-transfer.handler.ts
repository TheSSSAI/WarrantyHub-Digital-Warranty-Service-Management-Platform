import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { ITransferRepository } from '../../domain/ports/transfer.repository.port';
import { IMessagePublisher } from '../../../../shared/infrastructure/messaging/azure-service-bus.publisher';
import { ProductEntity } from '../../../product/domain/product.entity';
import { TransferStatus } from '../../domain/enums/transfer-status.enum';
import { DataSource } from 'typeorm'; // Assuming typeorm usage for transactions as per config

export enum TransferResponseAction {
    ACCEPT = 'ACCEPT',
    REJECT = 'REJECT'
}

export class RespondTransferCommand {
    constructor(
        public readonly transferId: string,
        public readonly respondingUserId: string,
        public readonly respondingUserEmail: string, // Needed to verify recipient
        public readonly action: TransferResponseAction
    ) {}
}

@CommandHandler(RespondTransferCommand)
export class RespondTransferHandler implements ICommandHandler<RespondTransferCommand> {
    private readonly logger = new Logger(RespondTransferHandler.name);

    constructor(
        @Inject('ITransferRepository')
        private readonly transferRepository: ITransferRepository & { findById(id: string): Promise<any>; save(entity: any): Promise<any> },
        @Inject('IProductRepository')
        private readonly productRepository: { findById(id: string): Promise<ProductEntity | null>; save(entity: ProductEntity): Promise<ProductEntity> },
        @Inject('IMessagePublisher')
        private readonly messagePublisher: IMessagePublisher,
        // Injecting DataSource for transaction management (common in NestJS/TypeORM)
        private readonly dataSource: DataSource 
    ) {}

    async execute(command: RespondTransferCommand): Promise<void> {
        const { transferId, respondingUserEmail, action, respondingUserId } = command;
        this.logger.log(`Processing transfer response ${action} for transfer ${transferId}`);

        // 1. Retrieve Transfer
        const transfer = await this.transferRepository.findById(transferId);
        if (!transfer) {
            throw new NotFoundException('Transfer request not found');
        }

        // 2. Validate Status
        if (transfer.status !== TransferStatus.Pending) {
            throw new ConflictException(`Transfer is not pending. Current status: ${transfer.status}`);
        }

        // 3. Validate Expiration
        if (new Date() > transfer.expiresAt) {
            transfer.status = TransferStatus.Expired;
            await this.transferRepository.save(transfer);
            throw new BadRequestException('Transfer request has expired');
        }

        // 4. Validate Recipient
        // Requirement: "by providing their email address". Recipient must verify email match.
        if (transfer.toEmail.toLowerCase() !== respondingUserEmail.toLowerCase()) {
            throw new BadRequestException('You are not the intended recipient of this transfer.');
        }

        if (action === TransferResponseAction.REJECT) {
            await this.handleRejection(transfer);
        } else {
            await this.handleAcceptance(transfer, respondingUserId);
        }
    }

    private async handleRejection(transfer: any): Promise<void> {
        transfer.status = TransferStatus.Rejected;
        transfer.updatedAt = new Date();
        
        await this.transferRepository.save(transfer);
        
        await this.messagePublisher.publish('transfer.rejected', {
            transferId: transfer.id,
            productId: transfer.productId,
            fromUserId: transfer.fromUserId,
            reason: 'Recipient rejected',
            timestamp: new Date().toISOString()
        });
        
        this.logger.log(`Transfer ${transfer.id} rejected.`);
    }

    private async handleAcceptance(transfer: any, newOwnerId: string): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Update Transfer Status
            transfer.status = TransferStatus.Accepted;
            transfer.updatedAt = new Date();
            // Use queryRunner to save transfer (pseudo-code assuming repo supports passing runner or using runner directly)
            await queryRunner.manager.save('ownership_transfers', transfer); // Using table name or entity class

            // Update Product Ownership
            const product = await this.productRepository.findById(transfer.productId);
            if (!product) throw new NotFoundException('Product not found during acceptance');

            const previousOwnerId = product.userId;
            product.userId = newOwnerId; // Ownership change
            // REQ-FUNC-004: "product record, including its entire service history, is disassociated..."
            // By changing the userId on the product entity, linked service history follows the product via productId FK.
            
            await queryRunner.manager.save(product);

            await queryRunner.commitTransaction();

            // Publish Events (Outside transaction or using outbox pattern in real impl, here direct publish)
            await this.messagePublisher.publish('transfer.accepted', {
                transferId: transfer.id,
                productId: product.id,
                previousOwnerId: previousOwnerId,
                newOwnerId: newOwnerId,
                timestamp: new Date().toISOString()
            });

            this.logger.log(`Transfer ${transfer.id} accepted. Ownership moved to ${newOwnerId}.`);

        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Failed to accept transfer ${transfer.id}`, error instanceof Error ? error.stack : String(error));
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}