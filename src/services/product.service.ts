import { PaginationInput } from '../schema/pagination.schema';
import { PaginationService } from './pagination.service';
import { ProductInput, ProductModel } from '../schema/product.schema';

export class ProductService {
  async getProducts(paginatedInput: PaginationInput) {
    const paginationService = new PaginationService({
      model: ProductModel,
      populate: 'manufacturer',
    });
    return paginationService.getPaginatedItems(paginatedInput);
  }

  async getProduct(_id: string) {
    return ProductModel.findById(_id).populate('manufacturer').lean();
  }

  async createProduct(product: ProductInput) {
    return (await ProductModel.create(product)).populate('manufacturer');
  }

  async updateProduct(_id: string, product: ProductInput) {
    return ProductModel.findByIdAndUpdate(_id, product, {
      new: true,
    }).populate('manufacturer');
  }

  async deleteProduct(_id: string) {
    return ProductModel.findByIdAndRemove(_id).populate('manufacturer');
  }
}
