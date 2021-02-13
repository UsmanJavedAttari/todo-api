import {Component, ControllerClass} from '@loopback/core';
import {Class} from '@loopback/repository';
import {UserController} from './controllers';
import {UserRepository} from './repositories';
import {UserService} from './services';

export class UserComponent implements Component {
  controllers?: ControllerClass[];
  services?: Array<Class<any>>;
  repositories = [UserRepository];

  constructor() {
    this.controllers = [UserController];
    this.services = [UserService];
  }
}
