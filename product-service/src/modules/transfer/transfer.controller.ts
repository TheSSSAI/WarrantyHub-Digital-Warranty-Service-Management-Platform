import { 
    Controller, 
    Get, 
    Post, 
    Param, 
    Body, 
    UseGuards, 
    Logger,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { User } from '../../shared/decorators/user.decorator';
import { UserContext } from '../../shared/interfaces/user-context.interface';

import { InitiateTransferCommand } from './application/commands/initiate-transfer.command';
import { RespondToTransferCommand } from './application/commands/respond-transfer.command';
import { CancelTransferCommand } from './application/commands/cancel-transfer.command';
import { GetPendingTransfersQuery } from './application/queries/get-pending-transfers.query';
import { GetTransferHistoryQuery } from './application/queries/get-transfer-history.query';

import { InitiateTransferDto } from './application/dtos/initiate-transfer.dto';
import { TransferRequestDto } from './application/dtos/transfer-request.dto';
import { TransferResponseEnum } from './domain/enums/transfer-response.enum';

@ApiTags('Ownership Transfers')
@ApiBearerAuth()
@Controller('transfers')
@UseGuards(JwtAuthGuard)
export class TransferController {
    private readonly logger = new Logger(TransferController.name);

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Initiate a product ownership transfer to another user' })
    @ApiResponse({ status: 201, description: 'Transfer initiated successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid email or product not eligible for transfer.' })
    @ApiResponse({ status: 403, description: 'User does not own the product.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @ApiResponse({ status: 409, description: 'Transfer already pending for this product.' })
    async initiateTransfer(
        @User() user: UserContext,
        @Body() initiateTransferDto: InitiateTransferDto,
    ): Promise<void> {
        this.logger.log(`User ${user.userId} initiating transfer for product ${initiateTransferDto.productId}`);
        
        await this.commandBus.execute(
            new InitiateTransferCommand(
                user.userId,
                initiateTransferDto.productId,
                initiateTransferDto.recipientEmail
            )
        );
    }

    @Get('pending')
    @ApiOperation({ summary: 'Get all pending transfers for the current user (incoming)' })
    @ApiResponse({ status: 200, description: 'List of pending transfers.', type: [TransferRequestDto] })
    async getPendingTransfers(
        @User() user: UserContext,
    ): Promise<TransferRequestDto[]> {
        return this.queryBus.execute(
            new GetPendingTransfersQuery(user.email) // Queries by recipient email
        );
    }

    @Get('history')
    @ApiOperation({ summary: 'Get transfer history (sent and received)' })
    @ApiResponse({ status: 200, description: 'History of transfers.', type: [TransferRequestDto] })
    async getTransferHistory(
        @User() user: UserContext,
    ): Promise<TransferRequestDto[]> {
        return this.queryBus.execute(
            new GetTransferHistoryQuery(user.userId)
        );
    }

    @Post(':id/accept')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Accept an incoming transfer request' })
    @ApiResponse({ status: 200, description: 'Transfer accepted and ownership updated.' })
    @ApiResponse({ status: 404, description: 'Transfer request not found.' })
    @ApiResponse({ status: 403, description: 'User is not the intended recipient.' })
    @ApiResponse({ status: 410, description: 'Transfer request has expired.' })
    async acceptTransfer(
        @User() user: UserContext,
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<void> {
        this.logger.log(`User ${user.userId} accepting transfer ${id}`);
        
        await this.commandBus.execute(
            new RespondToTransferCommand(id, user.userId, TransferResponseEnum.ACCEPT)
        );
    }

    @Post(':id/reject')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Reject an incoming transfer request' })
    @ApiResponse({ status: 200, description: 'Transfer rejected.' })
    @ApiResponse({ status: 404, description: 'Transfer request not found.' })
    @ApiResponse({ status: 403, description: 'User is not the intended recipient.' })
    async rejectTransfer(
        @User() user: UserContext,
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<void> {
        this.logger.log(`User ${user.userId} rejecting transfer ${id}`);
        
        await this.commandBus.execute(
            new RespondToTransferCommand(id, user.userId, TransferResponseEnum.REJECT)
        );
    }

    @Post(':id/cancel')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Cancel an initiated transfer request (Sender only)' })
    @ApiResponse({ status: 200, description: 'Transfer cancelled.' })
    @ApiResponse({ status: 403, description: 'User is not the initiator of this transfer.' })
    @ApiResponse({ status: 409, description: 'Transfer already completed or processed.' })
    async cancelTransfer(
        @User() user: UserContext,
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<void> {
        this.logger.log(`User ${user.userId} cancelling transfer ${id}`);
        
        await this.commandBus.execute(
            new CancelTransferCommand(id, user.userId)
        );
    }
}