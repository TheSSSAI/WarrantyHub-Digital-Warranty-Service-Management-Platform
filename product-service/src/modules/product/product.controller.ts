import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Param, 
    Body, 
    UseGuards, 
    Query, 
    ParseUUIDPipe, 
    HttpCode, 
    HttpStatus,
    Logger
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { User } from '../../shared/decorators/user.decorator';
import { UserContext } from '../../shared/interfaces/user-context.interface';

import { CreateProductCommand } from './application/commands/create-product.command';
import { UpdateProductCommand } from './application/commands/update-product.command';
import { DeleteProductCommand } from './application/commands/delete-product.command';
import { GetUserProductsQuery } from './application/queries/get-user-products.query';
import { GetProductDetailsQuery } from './application/queries/get-product-details.query';

import { CreateProductDto } from './application/dtos/create-product.dto';
import { UpdateProductDto } from './application/dtos/update-product.dto';
import { ProductDto } from './application/dtos/product.dto';
import { ProductListDto } from './application/dtos/product-list.dto';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
    private readonly logger = new Logger(ProductController.name);

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register a new product manually' })
    @ApiResponse({ status: 201, description: 'Product registered successfully.', type: ProductDto })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 409, description: 'Product with this serial number already exists.' })
    async registerProduct(
        @User() user: UserContext,
        @Body() createProductDto: CreateProductDto,
    ): Promise<ProductDto> {
        this.logger.log(`User ${user.userId} registering new product: ${createProductDto.modelId}`);
        
        return this.commandBus.execute(
            new CreateProductCommand(
                user.userId,
                createProductDto.brandId,
                createProductDto.modelId,
                createProductDto.serialNumber,
                createProductDto.purchaseDate,
                createProductDto.invoiceImageId
            )
        );
    }

    @Get()
    @ApiOperation({ summary: 'Get list of registered products for the current user' })
    @ApiResponse({ status: 200, description: 'List of products retrieved.', type: ProductListDto })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async getMyProducts(
        @User() user: UserContext,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<ProductListDto> {
        return this.queryBus.execute(
            new GetUserProductsQuery(user.userId, { page, limit })
        );
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get detailed information about a specific product' })
    @ApiResponse({ status: 200, description: 'Product details retrieved.', type: ProductDto })
    @ApiResponse({ status: 403, description: 'Forbidden. User does not own this product.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    async getProductDetails(
        @User() user: UserContext,
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ProductDto> {
        return this.queryBus.execute(
            new GetProductDetailsQuery(id, user.userId)
        );
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update product details' })
    @ApiResponse({ status: 200, description: 'Product updated successfully.', type: ProductDto })
    @ApiResponse({ status: 403, description: 'Forbidden. Product is locked or not owned by user.' })
    @ApiResponse({ status: 400, description: 'Cannot update critical fields on a locked product.' })
    async updateProduct(
        @User() user: UserContext,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<ProductDto> {
        this.logger.log(`User ${user.userId} attempting to update product ${id}`);
        return this.commandBus.execute(
            new UpdateProductCommand(id, user.userId, updateProductDto)
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Soft delete a product' })
    @ApiResponse({ status: 204, description: 'Product deleted successfully.' })
    @ApiResponse({ status: 403, description: 'Forbidden. Cannot delete product with active service requests.' })
    async deleteProduct(
        @User() user: UserContext,
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<void> {
        this.logger.log(`User ${user.userId} deleting product ${id}`);
        await this.commandBus.execute(
            new DeleteProductCommand(id, user.userId)
        );
    }
}