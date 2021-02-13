import {Entity, model, property} from '@loopback/repository';

@model()
export class ApiResponse<T> extends Entity {
  @property()
  Data: T;

  @property()
  Message: string;

  @property()
  Staus: boolean;

  constructor(data?: Partial<ApiResponse<T>>) {
    super(data);
  }
}
