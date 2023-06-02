import { Resolver, Query, Arg, Args, Mutation, Authorized } from 'type-graphql';
import { PaginationInput } from '../schema/pagination.schema';
import { UserRole } from '../enums/user-role';
import { ProductService } from '../services/product.service';
import {
  PaginatedProductResponse,
  Product,
  ProductInput,
} from '../schema/product.schema';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {
    this.productService = new ProductService();
  }

  @Query(() => PaginatedProductResponse)
  async getAllProducts(
    @Args() paginatedInput: PaginationInput
  ): Promise<PaginatedProductResponse> {
    return this.productService.getProducts(paginatedInput);
  }

  @Query(() => Product)
  async getProduct(@Arg('_id') _id: string): Promise<Product> {
    return this.productService.getProduct(_id);
  }

  @Mutation(() => Product)
  async createProduct(@Arg('product') product: ProductInput): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation(() => Product)
  async updateProduct(
    @Arg('_id') _id: string,
    @Arg('product') product: ProductInput
  ): Promise<Product> {
    return this.productService.updateProduct(_id, product);
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation(() => Product)
  async deleteProduct(@Arg('_id') _id: string): Promise<Product> {
    return this.productService.deleteProduct(_id);
  }
}
