import { Field, InputType, ObjectType } from 'type-graphql';
import { BaseModel } from './model.schema';
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose';
import { User } from './user.schema';
import { Types } from 'mongoose';
import { MinLength } from 'class-validator';
import { ObjectIdScalar } from '../object-id.scalar';
import PaginatedResponse from './pagination.schema';

@ObjectType()
export class Document extends BaseModel {
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

export const DocumentModel = getModelForClass(Document, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class DocumentInput {
  @Field()
  @MinLength(3)
  title: string;
  @MinLength(3)
  @Field()
  content: string;
  @Field(() => ObjectIdScalar)
  author: Types.ObjectId;
}

@ObjectType()
export class PaginatedDocumentResponse extends PaginatedResponse(Document) {}
