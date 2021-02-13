import {service} from '@loopback/core';
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {REQUEST_TYPE} from '../../../globals';
import {BaseController} from '../../../shared/controllers/base.controller';
import {Login, Signup} from '../models';
import {AccountService} from '../services';

export class AccountController extends BaseController {
  constructor(
    @service(AccountService)
    private accountSrv: AccountService,
  ) {
    super();
  }

  @post('/account/login')
  async login(
    @requestBody({
      content: {
        [REQUEST_TYPE.JSON]: {
          schema: getModelSchemaRef(Login),
        },
      },
    })
    loginData: Login,
  ) {
    return this.sendResponse(await this.accountSrv.login(loginData));
  }

  @post('/account/signup')
  async signup(
    @requestBody({
      content: {
        [REQUEST_TYPE.JSON]: {
          schema: getModelSchemaRef(Signup),
        },
      },
    })
    signupData: Signup,
  ) {
    return this.sendResponse(await this.accountSrv.signup(signupData));
  }
}
