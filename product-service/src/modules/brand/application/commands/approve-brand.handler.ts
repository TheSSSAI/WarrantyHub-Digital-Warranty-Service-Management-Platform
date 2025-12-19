import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { IBrandRepository } from '../../domain/ports/brand.repository.port';
import { IMessagePublisher } from '../../../../shared/infrastructure/messaging/azure-service-bus.publisher';

export class ApproveBrandCommand {
    constructor(
        public readonly brandId: string,
        public readonly adminId: string
    ) {}
}

@CommandHandler(ApproveBrandCommand)
export class ApproveBrandHandler implements ICommandHandler<ApproveBrandCommand> {
    private readonly logger = new Logger(ApproveBrandHandler.name);

    constructor(
        @Inject('IBrandRepository')
        private readonly brandRepository: IBrandRepository,
        @Inject('IMessagePublisher')
        private readonly messagePublisher: IMessagePublisher,
    ) {}

    async execute(command: ApproveBrandCommand): Promise<void> {
        const { brandId, adminId } = command;
        this.logger.log(`Processing ApproveBrandCommand for brand: ${brandId} by admin: ${adminId}`);

        const brand = await this.brandRepository.findById(brandId);

        if (!brand) {
            this.logger.error(`Brand with ID ${brandId} not found`);
            throw new NotFoundException(`Brand with ID ${brandId} not found`);
        }

        if (brand.status !== 'PENDING') {
            this.logger.warn(`Brand ${brandId} is not in pending state. Current status: ${brand.status}`);
            throw new BadRequestException(`Brand must be in PENDING state to be approved. Current status: ${brand.status}`);
        }

        // Domain logic: Approve brand
        // Assuming the entity has a method to change state, or we modify directly
        brand.status = 'APPROVED';
        brand.approvedBy = adminId;
        brand.approvedAt = new Date();

        await this.brandRepository.save(brand);
        this.logger.log(`Brand ${brandId} successfully approved`);

        // Publish integration event for notifications and audit
        await this.messagePublisher.publish('brand.approved', {
            brandId: brand.id,
            name: brand.name,
            adminId: adminId,
            timestamp: new Date().toISOString(),
        });
    }
}