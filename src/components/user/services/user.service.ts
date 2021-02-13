import {bind, BindingScope} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {User} from '../models';
import {UserRepository} from '../repositories';

@bind({
  scope: BindingScope.SINGLETON,
})
export class UserService {
  constructor(
    @repository(UserRepository)
    private userRepo: UserRepository,
  ) {}

  async create(user: User) {
    return this.userRepo.create(user);
  }

  async findOne(filter: Filter<User>) {
    return this.userRepo.findOne(filter);
  }
}
