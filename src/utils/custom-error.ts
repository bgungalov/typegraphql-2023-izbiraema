import { GraphQLError } from 'graphql/error';

export function CustomError(message: string, code: string) {
  return new GraphQLError(message, {
    extensions: {
      code,
    },
  });
}
