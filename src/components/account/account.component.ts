import {Component, ControllerClass} from '@loopback/core';
import {Class} from '@loopback/repository';
import {AccountController} from './controllers';
import {AccountService} from './services';

export class AccountComponent implements Component {
  controllers?: ControllerClass[];
  services: Array<Class<any>>;

  constructor() {
    this.controllers = [AccountController];
    this.services = [AccountService];
  }
}
