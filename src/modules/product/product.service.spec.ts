import { RepositoryService } from 'src/models/repository/repository.service';
import { ProductService } from './product.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from 'src/models/entities/product.entity';
import { SaveOptions, RemoveOptions } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let repositoryService: RepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,

        {
          provide: RepositoryService,
          useValue: {
            productRepo: {
              save: jest.fn().mockReturnValue(Promise.resolve(new Product())),
              update: jest.fn().mockReturnValue(Promise.resolve(new Product())),
              create: jest.fn().mockReturnValue(Promise.resolve(new Product())),
              delete: jest.fn().mockReturnValue(Promise.resolve(new Product())),
              merge: jest.fn().mockReturnValue(Promise.resolve(new Product())),
              findOne: jest
                .fn()
                .mockReturnValue(Promise.resolve(new Product())),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repositoryService = module.get<RepositoryService>(RepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'buah',
        price: 10000,
        quantity: 5,
      };

      const savedProduct: Product = {
        id: '1',
        name: 'buah',
        price: 10000,
        quantity: 5,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        transaction: [],
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<Product> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<Product> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<Product> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<Product> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      };

      (repositoryService.productRepo.create as jest.Mock).mockReturnValue(
        Promise.resolve(savedProduct),
      );

      const result = await service.createProduct(createProductDto);

      expect(repositoryService.productRepo.create).toHaveBeenCalledWith(
        createProductDto,
      );
      expect(result).toEqual(savedProduct);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'updated_buah',
        price: 15000,
        quantity: 10,
      };

      const updatedProduct: Product = {
        id: '1',
        name: 'updated_buah',
        price: 15000,
        quantity: 10,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        transaction: [],
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<Product> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<Product> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<Product> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<Product> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      };

      (repositoryService.productRepo.update as jest.Mock).mockResolvedValue({
        affected: 1,
      });

      (repositoryService.productRepo.findOne as jest.Mock).mockResolvedValue(
        updatedProduct,
      );

      const result = await service.updateProduct('1', updateProductDto);

      expect(repositoryService.productRepo.update).toHaveBeenCalledWith(
        '1',
        updateProductDto,
      );
      expect(repositoryService.productRepo.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('getById', () => {
    it('should return a product by id', async () => {
      const productId = '1';
      const product: Product = {
        id: '1',
        name: 'buah',
        price: 10000,
        quantity: 5,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        transaction: [],
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<Product> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<Product> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<Product> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<Product> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      };

      // Mock the findOne method of repositoryService.productRepo
      (repositoryService.productRepo.findOne as jest.Mock).mockResolvedValue(
        product, // Return the product object
      );

      const result = await service.getProductById(productId);

      expect(repositoryService.productRepo.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(product);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const productId = '1';

      // Mock the delete method of repositoryService.productRepo
      (repositoryService.productRepo.delete as jest.Mock).mockResolvedValue({
        affected: 1,
      });

      const result = await service.deleteProduct(productId);

      expect(repositoryService.productRepo.delete).toHaveBeenCalledWith(
        productId,
      );
      expect(result).toEqual('Product deleted successfully');
    });
  });
});
