import { Resolver, Query, Arg, Args, Mutation, Authorized } from 'type-graphql';
import { PaginationInput } from '../schema/pagination.schema';
import { UserRole } from '../enums/user-role';
import { CommentService } from '../services/comment.service';
import {
  Comment,
  CommentInput,
  PaginatedCommentResponse,
} from '../schema/comment.schema';

@Resolver()
export class CommentResolver {
  constructor(private commentService: CommentService) {
    this.commentService = new CommentService();
  }

  @Query(() => PaginatedCommentResponse)
  async getAllComments(
    @Args() paginatedInput: PaginationInput
  ): Promise<PaginatedCommentResponse> {
    return this.commentService.getComments(paginatedInput);
  }

  @Query(() => Comment)
  async getComment(@Arg('_id') _id: string): Promise<Comment> {
    return this.commentService.getComment(_id);
  }

  @Mutation(() => Comment)
  async createComment(@Arg('comment') comment: CommentInput): Promise<Comment> {
    return this.commentService.createComment(comment);
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation(() => Comment)
  async updateComment(
    @Arg('_id') _id: string,
    @Arg('comment') comment: CommentInput
  ): Promise<Comment> {
    return this.commentService.updateComment(_id, comment);
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation(() => Comment)
  async deleteComment(@Arg('_id') _id: string): Promise<Comment> {
    return this.commentService.deleteComment(_id);
  }
}
