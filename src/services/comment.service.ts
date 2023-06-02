import { PaginationInput } from '../schema/pagination.schema';
import { PaginationService } from './pagination.service';
import { DocumentInput } from '../schema/document-schema';
import { CommentModel } from '../schema/comment.schema';

export class CommentService {
  async getComments(paginatedInput: PaginationInput) {
    const paginationService = new PaginationService({
      model: CommentModel,
      populate: 'author',
    });
    return paginationService.getPaginatedItems(paginatedInput);
  }

  async getComment(_id: string) {
    return CommentModel.findById(_id).populate('author').lean();
  }

  async createComment(comment: DocumentInput) {
    return (await CommentModel.create(comment)).populate('author');
  }

  async updateComment(_id: string, comment: DocumentInput) {
    return CommentModel.findByIdAndUpdate(_id, comment, {
      new: true,
    }).populate('author');
  }

  async deleteComment(_id: string) {
    return CommentModel.findByIdAndRemove(_id).populate('author');
  }
}
