import { 
    Controller, 
    Get, 
    Patch, 
    Param, 
    Body, 
    UseGuards, 
    HttpStatus, 
    HttpCode, 
    Query,
    Logger,
    ParseUUIDPipe
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';

import { ApproveBrandCommand } from './application/commands/approve-brand.command';
import { RejectBrandCommand } from './application/commands/reject-brand.command';
import { GetPendingBrandsQuery } from './application/queries/get-pending-brands.query';
import { RejectBrandDto } from './application/dtos/reject-brand.dto';
import { BrandDto } from './application/dtos/brand.dto';

@ApiTags('Brand Administration')
@ApiBearerAuth()
@Controller('admin/brands')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class BrandAdminController {
    private readonly logger = new Logger(BrandAdminController.name);

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get('pending')
    @ApiOperation({ summary: 'Get all pending brand registration requests' })
    @ApiResponse({ status: 200, description: 'List of pending brands returned.', type: [BrandDto] })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'offset', required: false, type: Number })
    async getPendingBrands(
        @Query('limit') limit?: number,
        @Query('offset') offset?: number,
    ): Promise<BrandDto[]> {
        this.logger.log('Fetching pending brand requests');
        return this.commandBus.execute(
            new GetPendingBrandsQuery(limit || 20, offset || 0)
        );
    }

    @Patch(':id/approve')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Approve a pending brand registration' })
    @ApiResponse({ status: 200, description: 'Brand approved successfully.' })
    @ApiResponse({ status: 404, description: 'Brand not found.' })
    @ApiResponse({ status: 409, description: 'Brand is not in pending state.' })
    async approveBrand(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<void> {
        this.logger.log(`Approving brand request: ${id}`);
        await this.commandBus.execute(new ApproveBrandCommand(id));
    }

    @Patch(':id/reject')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Reject a pending brand registration with a reason' })
    @ApiBody({ type: RejectBrandDto })
    @ApiResponse({ status: 200, description: 'Brand rejected successfully.' })
    @ApiResponse({ status: 400, description: 'Rejection reason is missing.' })
    @ApiResponse({ status: 404, description: 'Brand not found.' })
    @ApiResponse({ status: 409, description: 'Brand is not in pending state.' })
    async rejectBrand(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() rejectBrandDto: RejectBrandDto,
    ): Promise<void> {
        this.logger.log(`Rejecting brand request: ${id}`);
        await this.commandBus.execute(
            new RejectBrandCommand(id, rejectBrandDto.reason)
        );
    }
}