import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from 'type-graphql';
import { getModelForClass, prop as Prop } from '@typegoose/typegoose';
import { UserRole } from '../enums/user-role';
import { IsEmail, MinLength, MaxLength } from 'class-validator';
import PaginatedResponse from './pagination.schema';
import { BaseModel } from './model.schema';

registerEnumType(UserRole, {
  name: 'UserRole',
});
@ObjectType()
export class User extends BaseModel {
  @Prop({ required: true })
  @Field()
  firstName: string;
  @Prop({ required: true })
  @Field()
  lastName: string;
  @Prop({ required: true })
  @Field()
  email: string;
  @Prop({ required: true })
  @Field()
  password: string;
  @Prop()
  @Field({ nullable: true })
  address?: string;
  @Field({ nullable: true })
  ucn: string;
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  state?: string;
  @Field({ nullable: true })
  postalCode?: string;
  @Prop({ type: [String], enum: UserRole, default: [UserRole.USER] })
  @Field(() => [UserRole])
  roles: UserRole[];
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class BaseUserInput {
  @Field()
  @MaxLength(30)
  firstName: string;
  @Field()
  @MaxLength(30)
  lastName: string;
  @Field()
  @MinLength(6)
  password: string;
  @Field({ nullable: true })
  address?: string;
  @Field({ nullable: true })
  ucn: string;
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  state?: string;
  @Field({ nullable: true })
  postalCode?: string;
}
@InputType()
export class CreateUserInput extends BaseUserInput {
  @Field()
  @IsEmail()
  email: string;
}

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(User) {}

@ArgsType()
export class UserLoginArgs {
  @Field()
  @IsEmail()
  email: string;
  @MinLength(6)
  @Field()
  password: string;
}
