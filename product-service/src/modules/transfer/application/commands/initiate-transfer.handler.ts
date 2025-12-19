import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { ITransferRepository } from '../../domain/ports/transfer.repository.port';
import { IMessagePublisher } from '../../../../shared/infrastructure/messaging/azure-service-bus.publisher';
import { InitiateTransferDto } from '../dtos/initiate-transfer.dto';
import { ProductEntity } from '../../../product/domain/product.entity';
import { TransferStatus } from '../../domain/enums/transfer-status.enum';

export class InitiateTransferCommand {
    constructor(
        public readonly userId: string,
        public readonly productId: string,
        public readonly dto: InitiateTransferDto
    ) {}
}

// Assuming a simplified TransferRequest entity interface for compilation if explicit file isn't available in context
interface TransferRequestEntity {
    id?: string;
    productId: string;
    fromUserId: string;
    toEmail: string;
    status: string;
    createdAt: Date;
    expiresAt: Date;
}

@CommandHandler(InitiateTransferCommand)
export class InitiateTransferHandler implements ICommandHandler<InitiateTransferCommand> {
    private readonly logger = new Logger(InitiateTransferHandler.name);
    private readonly EXPIRATION_HOURS = 72;

    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: { findById(id: string): Promise<ProductEntity | null> },
        @Inject('ITransferRepository')
        private readonly transferRepository: ITransferRepository & { 
            findPendingByProductId(id: string): Promise<TransferRequestEntity | null>;
            create(data: any): TransferRequestEntity;
            save(entity: TransferRequestEntity): Promise<TransferRequestEntity>;
        },
        @Inject('IMessagePublisher')
        private readonly messagePublisher: IMessagePublisher,
    ) {}

    async execute(command: InitiateTransferCommand): Promise<string> {
        const { userId, productId, dto } = command;
        this.logger.log(`Initiating transfer for product ${productId} from user ${userId} to ${dto.recipientEmail}`);

        // 1. Validate Product Ownership
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.userId !== userId) {
            throw new BadRequestException('You do not own this product');
        }

        // 2. Validate Business Rule: BR-TRANSFER-02 (Single pending transfer)
        const existingTransfer = await this.transferRepository.findPendingByProductId(productId);
        if (existingTransfer) {
            throw new ConflictException('A transfer request is already pending for this product.');
        }

        // 3. Create Transfer Request
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + this.EXPIRATION_HOURS);

        const newTransfer = this.transferRepository.create({
            productId: product.id,
            fromUserId: userId,
            toEmail: dto.recipientEmail,
            status: TransferStatus.Pending,
            createdAt: new Date(),
            expiresAt: expirationDate
        });

        const savedTransfer = await this.transferRepository.save(newTransfer);

        // 4. Publish Event
        // Triggers: Notification to recipient, Pausing of Service Requests (US-115)
        await this.messagePublisher.publish('transfer.initiated', {
            transferId: savedTransfer.id,
            productId: product.id,
            fromUserId: userId,
            toEmail: dto.recipientEmail,
            timestamp: new Date().toISOString(),
        });

        this.logger.log(`Transfer ${savedTransfer.id} initiated successfully.`);
        return savedTransfer.id as string;
    }
}