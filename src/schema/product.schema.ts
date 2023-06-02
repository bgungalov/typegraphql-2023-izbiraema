import { Field, Float, InputType, ObjectType } from 'type-graphql';
import { BaseModel } from './model.schema';
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose';
import { User } from './user.schema';
import { Types } from 'mongoose';
import { MinLength } from 'class-validator';
import { ObjectIdScalar } from '../object-id.scalar';
import PaginatedResponse from './pagination.schema';

@ObjectType()
export class Product extends BaseModel {
  @Prop({ required: true })
  @Field()
  name: string;
  @Prop({ required: true })
  @Field(() => Float)
  price: number;
  @Prop({ required: true })
  @Field()
  description: string;
  @Field(() => User)
  @Prop({ ref: User, required: true })
  manufacturer: Ref<User, Types.ObjectId>;
}

export const ProductModel = getModelForClass(Product, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class ProductInput {
  @Field()
  @MinLength(2)
  name: string;
  @Field()
  price: number;
  @Field()
  @MinLength(2)
  description: string;
  @Field(() => ObjectIdScalar)
  manufacturer: Types.ObjectId;
}

@ObjectType()
export class PaginatedProductResponse extends PaginatedResponse(Product) {}
