import { 
    Controller, 
    Get, 
    Patch, 
    Param, 
    Body, 
    UseGuards, 
    ParseUUIDPipe, 
    Logger,
    HttpStatus,
    HttpCode
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';

import { ApiKeyGuard } from '../../shared/guards/api-key.guard';
import { UpdateProductOcrDataCommand } from './application/commands/update-product-ocr-data.command';
import { ValidateWarrantyQuery } from './application/queries/validate-warranty.query';
import { OcrDataDto } from './application/dtos/ocr-data.dto';
import { WarrantyValidationDto } from './application/dtos/warranty-validation.dto';

@ApiTags('Internal Product Operations')
@ApiSecurity('api-key')
@Controller('internal/products')
@UseGuards(ApiKeyGuard)
export class ProductInternalController {
    private readonly logger = new Logger(ProductInternalController.name);

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Patch(':id/ocr-data')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Callback endpoint for OCR worker to update product data' })
    @ApiResponse({ status: 200, description: 'Product updated with OCR data.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    async updateOcrData(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() ocrDataDto: OcrDataDto,
    ): Promise<void> {
        this.logger.log(`Received OCR data update for product ${id}`);
        
        await this.commandBus.execute(
            new UpdateProductOcrDataCommand(
                id, 
                ocrDataDto.extractedData, 
                ocrDataDto.confidenceScore,
                ocrDataDto.rawText
            )
        );
    }

    @Get(':id/warranty-status')
    @ApiOperation({ summary: 'Internal check for warranty validity used by Service Request Service' })
    @ApiResponse({ status: 200, description: 'Warranty status returned.', type: WarrantyValidationDto })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    async validateWarranty(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<WarrantyValidationDto> {
        this.logger.debug(`Internal warranty validation check for product ${id}`);
        
        return this.queryBus.execute(
            new ValidateWarrantyQuery(id)
        );
    }
}