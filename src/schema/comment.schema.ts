import { Field, InputType, ObjectType } from 'type-graphql';
import { BaseModel } from './model.schema';
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose';
import { User } from './user.schema';
import { Types } from 'mongoose';
import { MinLength } from 'class-validator';
import { ObjectIdScalar } from '../object-id.scalar';
import PaginatedResponse from './pagination.schema';

@ObjectType()
export class Comment extends BaseModel {
  @Prop({ required: true })
  @Field()
  title: string;
  @Prop({ required: true })
  @Field()
  content: string;
  @Field(() => User)
  @Prop({ ref: User, required: true })
  author: Ref<User, Types.ObjectId>;
}

export const CommentModel = getModelForClass(Comment, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class CommentInput {
  @Field()
  @MinLength(3)
  title: string;
  @Field()
  @MinLength(3)
  content: string;
  @Field(() => ObjectIdScalar)
  author: Types.ObjectId;
}

@ObjectType()
export class PaginatedCommentResponse extends PaginatedResponse(Comment) {}
