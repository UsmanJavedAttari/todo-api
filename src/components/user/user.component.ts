import {Component, ControllerClass} from '@loopback/core';
import {UserController} from './controllers';
import {UserRepository} from './repositories';
import {UserService} from './services';

export class UserComponent implements Component {
  controllers?: ControllerClass[];
  serviceProviders: [UserService];
  repositories: [UserRepository];

  constructor() {
    this.controllers = [UserController];
  }
}
