import {model, property} from '@loopback/repository';
import {BaseModel} from '../../../shared/models/base.model';

@model({name: 'user'})
export class User extends BaseModel {
  @property({
    id: true,
    generated: false,
    type: 'string',
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Password: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
