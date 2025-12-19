import { 
    Controller, 
    Get, 
    Param, 
    UseGuards, 
    Logger,
    NotFoundException
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { GetProductByBarcodeQuery } from './application/queries/get-product-by-barcode.query';
import { ProductLookupDto } from './application/dtos/product-lookup.dto';

@ApiTags('Product Lookup')
@ApiBearerAuth()
@Controller('products/lookup')
@UseGuards(JwtAuthGuard)
export class ProductLookupController {
    private readonly logger = new Logger(ProductLookupController.name);

    constructor(
        private readonly queryBus: QueryBus,
    ) {}

    @Get('barcode/:code')
    @ApiOperation({ summary: 'Lookup product master data by barcode or QR code' })
    @ApiParam({ name: 'code', description: 'Scanned barcode or QR code value' })
    @ApiResponse({ status: 200, description: 'Product model details found.', type: ProductLookupDto })
    @ApiResponse({ status: 404, description: 'No product found for this code.' })
    async lookupByBarcode(
        @Param('code') code: string,
    ): Promise<ProductLookupDto> {
        this.logger.log(`Looking up product by barcode: ${code}`);

        const result = await this.queryBus.execute(
            new GetProductByBarcodeQuery(code)
        );

        if (!result) {
            throw new NotFoundException(`No product model found for code: ${code}`);
        }

        return result;
    }
}