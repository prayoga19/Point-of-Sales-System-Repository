import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('product')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProduct: CreateProductDto) {
    return this.productService.createProduct(createProduct);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    const result = await this.productService.getAllProduct({
      page,
      limit,
    });
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.getProductById(String(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProduct: UpdateProductDto,
  ) {
    return this.productService.updateProduct(String(id), updateProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.deleteProduct(String(id));
  }
}
