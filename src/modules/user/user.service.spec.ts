import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { RepositoryService } from 'src/models/repository/repository.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/models/entities/user.entity';
import { SaveOptions, RemoveOptions } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repositoryService: RepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: RepositoryService,
          useValue: {
            userRepo: {
              save: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repositoryService = module.get<RepositoryService>(RepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const savedUser: User = {
        id: 'test',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        transaction: [],
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<User> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<User> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<User> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<User> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      };

      jest
        .spyOn(repositoryService.userRepo, 'save')
        .mockResolvedValue(savedUser);

      const result = await service.create(createUserDto);

      expect(repositoryService.userRepo.save).toHaveBeenCalledWith(
        createUserDto,
      );
      expect(result).toEqual(savedUser);
    });
  });
});
