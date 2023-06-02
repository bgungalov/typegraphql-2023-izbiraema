import { Resolver, Query, Arg, Args, Mutation, Authorized } from 'type-graphql';
import { PaginationInput } from '../schema/pagination.schema';
import { UserRole } from '../enums/user-role';
import { DocumentService } from '../services/document.service';
import {
  Document,
  DocumentInput,
  PaginatedDocumentResponse,
} from '../schema/document-schema';

@Resolver()
export class DocumentResolver {
  constructor(private documentService: DocumentService) {
    this.documentService = new DocumentService();
  }

  @Query(() => PaginatedDocumentResponse)
  async getAllDocuments(
    @Args() paginatedInput: PaginationInput
  ): Promise<PaginatedDocumentResponse> {
    return this.documentService.getDocuments(paginatedInput);
  }

  @Query(() => Document)
  async getDocument(@Arg('_id') _id: string): Promise<Document> {
    return this.documentService.getDocument(_id);
  }

  @Mutation(() => Document)
  async createDocument(
    @Arg('document') document: DocumentInput
  ): Promise<Document> {
    return this.documentService.createDocument(document);
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation(() => Document)
  async updateDocument(
    @Arg('_id') _id: string,
    @Arg('document') document: DocumentInput
  ): Promise<Document> {
    return this.documentService.updateDocument(_id, document);
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation(() => Document)
  async deleteDocument(@Arg('_id') _id: string): Promise<Document> {
    return this.documentService.deleteDocument(_id);
  }
}
