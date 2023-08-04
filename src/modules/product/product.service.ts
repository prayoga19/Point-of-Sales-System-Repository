import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/models/repository/repository.service';
import { UserService } from '../user/user.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProduct } from './dto/update-product.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Product } from 'src/models/entities/product.entity';

@Injectable()
export class ProductService {
  public constructor(private readonly repoService: RepositoryService) {}
  async getAllProduct(options: IPaginationOptions) {
    const productData = await this.repoService.productRepo
      .createQueryBuilder('product')
      .orderBy('product.created_at', 'DESC');

    return paginate<Product>(productData, options);
  }
  async getProductById(id: string) {
    const productData = await this.repoService.productRepo.findOne({
      where: { id },
    });
    if (productData) {
      return productData;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error_code: 'PRODUCT_NOT_FOUND',
          message: 'data not found on system',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createProduct(payloads: CreateProductDto) {
    const productData = await this.repoService.productRepo.create({
      name: payloads.name,
      price: payloads.price,
      quantity: payloads.quantity,
    });
    await this.repoService.productRepo.save(productData);
    return productData;
  }

  async updateProduct(id: string, payloads: UpdateProduct) {
    await this.repoService.productRepo.update(id, payloads);
    const updateProductData = await this.repoService.productRepo.findOne({
      where: { id },
    });
    if (updateProductData) {
      return updateProductData;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error_code: 'PRODUCT_NOT_FOUND',
          message: 'data not found on system',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteProduct(id: string) {
    const productData = await this.repoService.productRepo.delete(id);
    if (!productData.affected) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error_code: 'PRODUCT_NOT_FOUND',
          message: 'data not found on system',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
