import { Resolver, Args, Mutation } from 'type-graphql';
import { UserService } from '../services/user.service';
import { UserLoginArgs } from '../schema/user.schema';

@Resolver()
export class AuthenticationResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => String)
  async login(@Args() { email, password }: UserLoginArgs): Promise<string> {
    return this.userService.login(email, password);
  }
}
