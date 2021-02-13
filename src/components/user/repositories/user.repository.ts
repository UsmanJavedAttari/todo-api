import {inject} from '@loopback/core';
import {MysqlDataSource} from '../../../datasources';
import {BaseRepository} from '../../../shared/repositories/base.repository';
import {User} from '../models';

export class UserRepository extends BaseRepository<
  User,
  typeof User.prototype.Id
> {
  constructor(@inject('datasources.mysql') dataSource: MysqlDataSource) {
    super(User, dataSource);
  }
}
