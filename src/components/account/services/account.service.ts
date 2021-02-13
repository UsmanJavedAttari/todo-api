import {bind, BindingScope, service} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {compareSync, hashSync} from 'bcrypt';
import {User} from '../../user/models';
import {UserService} from '../../user/services';
import {Login, Signup} from '../models';

@bind({
  scope: BindingScope.SINGLETON,
})
export class AccountService {
  constructor(
    @service(UserService)
    private userSrv: UserService,
  ) {}

  async login(loginData: Login) {
    const user = await this.userSrv.findOne({where: {Email: loginData.Email}});
    if (!user) {
      throw new HttpErrors.Unauthorized('Email not found.');
    }

    if (!compareSync(loginData.Password, user.Password)) {
      throw new HttpErrors.Unauthorized('Password is wrong.');
    }

    return user;
  }

  async signup(signupData: Signup) {
    const encPass = hashSync(signupData.Password, 10);

    const newUser = new User(signupData);

    newUser.Password = encPass;

    return this.userSrv.create(newUser);
  }
}
