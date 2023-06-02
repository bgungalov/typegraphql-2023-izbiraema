import { UserResolver } from './user.resolver';
import { DocumentResolver } from './document.resolver';
import { CommentResolver } from './comment.resolver';
import { ProductResolver } from './product.resolver';
import { AuthenticationResolver } from './authentication.resolver';

export const resolvers = [
  UserResolver,
  DocumentResolver,
  CommentResolver,
  ProductResolver,
  AuthenticationResolver,
] as const;
