import {
  BaseUserInput,
  CreateUserInput,
  User,
  UserModel,
} from '../schema/user.schema';
import { PaginationInput } from '../schema/pagination.schema';
import { PaginationService } from './pagination.service';
import { CustomError } from '../utils/custom-error';
import { ErrorCodes } from '../constants/error-codes';
import { generateToken } from '../utils/token';
import bcryptjs from 'bcryptjs';

export class UserService {
  async getUsers(paginatedInput: PaginationInput) {
    const userPaginationServices = new PaginationService({ model: UserModel });
    return userPaginationServices.getPaginatedItems(paginatedInput);
  }

  async getUser(_id: string) {
    return UserModel.findById(_id).lean();
  }

  async createUser(user: CreateUserInput) {
    const password = bcryptjs.hashSync(user.password, 10);
    const userData = { ...user, password };
    const createdUser = await UserModel.create(userData);
    return generateToken(
      createdUser._id,
      createdUser.firstName,
      createdUser.lastName,
      createdUser.roles
    );
  }

  async updateUser(_id: string, user: BaseUserInput) {
    return UserModel.findByIdAndUpdate(_id, user, { new: true });
  }

  async deleteUser(_id: string) {
    return UserModel.findByIdAndRemove(_id);
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      throw CustomError('User not found', ErrorCodes.BAD_USER_INPUT);
    }
    const isMatching = await bcryptjs.compare(password, user.password);
    if (!isMatching) {
      throw CustomError('User not found', ErrorCodes.BAD_USER_INPUT);
    }
    return generateToken(user._id, user.firstName, user.lastName, user.roles);
  }

  async getCurrentUser(user: User) {
    if (!user?._id) {
      throw CustomError('Unauthenticated', ErrorCodes.UNAUTHENTICATED);
    }
    return UserModel.findById(user._id).lean();
  }
}
