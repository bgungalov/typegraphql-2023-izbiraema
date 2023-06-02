import { PaginationInput } from '../schema/pagination.schema';
import { PaginationService } from './pagination.service';
import { DocumentInput, DocumentModel } from '../schema/document-schema';

export class DocumentService {
  async getDocuments(paginatedInput: PaginationInput) {
    const paginationService = new PaginationService({
      model: DocumentModel,
      populate: 'author',
    });
    return paginationService.getPaginatedItems(paginatedInput);
  }

  async getDocument(_id: string) {
    return DocumentModel.findById(_id).populate('author').lean();
  }

  async createDocument(document: DocumentInput) {
    return (await DocumentModel.create(document)).populate('author');
  }

  async updateDocument(_id: string, document: DocumentInput) {
    return DocumentModel.findByIdAndUpdate(_id, document, {
      new: true,
    }).populate('author');
  }

  async deleteDocument(_id: string) {
    return DocumentModel.findByIdAndRemove(_id).populate('author');
  }
}
