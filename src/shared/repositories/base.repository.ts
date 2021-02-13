import {
  AnyObject,
  DataObject,
  DefaultCrudRepository,
  Filter,
  juggler,
  Where,
} from '@loopback/repository';
import {Count} from '@loopback/repository/src/common-types';
import {Options} from 'loopback-datasource-juggler';
import {getUUID} from '../../globals';
import {BaseModel} from '../models/base.model';

export abstract class BaseRepository<
  T extends BaseModel,
  ID,
  Relations extends object = {}
> extends DefaultCrudRepository<T, ID, Relations> {
  constructor(
    entityClass: typeof BaseModel & {
      prototype: T;
    },
    dataSource: juggler.DataSource,
  ) {
    super(entityClass, dataSource);
  }

  create(entity: DataObject<T>, options?: Options): Promise<T> {
    if (!(<any>entity)['Id']) {
      (<any>entity)['Id'] = getUUID();
    }
    entity.Created = entity.Updated = new Date().toISOString();
    entity.Deleted = false;
    return super.create(entity, options);
  }

  createAll(entities: DataObject<T>[], options?: Options): Promise<T[]> {
    entities.forEach((item: any) => {
      if (!item['Id']) {
        item['Id'] = getUUID();
      }
      item.Created = item.Updated = new Date().toISOString();
      item.Deleted = false;
    });
    return super.createAll(entities, options);
  }

  find(filter: Filter<T> = {}, options?: Options): Promise<(T & Relations)[]> {
    // Filter out soft deleted entries
    filter.where = filter.where ?? {};
    (filter.where as AnyObject).Deleted = false;

    // Now call super
    return super.find(filter, options);
  }

  findOne(
    filter: Filter<T> = {},
    options?: Options,
  ): Promise<(T & Relations) | null> {
    // Filter out soft deleted entries
    filter.where = filter.where ?? {};
    (filter.where as AnyObject).Deleted = false;

    // Now call super
    return super.findOne(filter, options);
  }

  findById(
    id: ID,
    filter: Filter<T> = {},
    options?: Options,
  ): Promise<T & Relations> {
    // Filter out soft deleted entries
    filter.where = filter.where ?? {};
    (filter.where as AnyObject).Deleted = false;

    // Now call super
    return super.findById(id, filter, options);
  }

  updateAll(
    data: DataObject<T>,
    where: Where<T> = {},
    options?: Options,
  ): Promise<Count> {
    // Filter out soft deleted entries
    (where as AnyObject).Deleted = false;

    data.Updated = new Date().toISOString();

    // Now call super
    return super.updateAll(data, where, options);
  }

  updateById(id: ID, data: DataObject<T>, options?: Options): Promise<void> {
    data.Updated = new Date().toISOString();
    return super.updateById(id, data, options);
  }

  replaceById(id: ID, data: DataObject<T>, options?: Options): Promise<void> {
    data.Updated = new Date().toISOString();
    return super.replaceById(id, data, options);
  }

  count(where: Where<T> = {}, options?: Options): Promise<Count> {
    // Filter out soft deleted entries
    (where as AnyObject).Deleted = false;

    // Now call super
    return super.count(where, options);
  }

  countAll(where?: Where<T>, options?: Options): Promise<Count> {
    // Now call super
    return super.count(where, options);
  }

  delete(entity: T, options?: Options): Promise<void> {
    // Do soft delete, no hard delete allowed
    (entity as AnyObject).Deleted = true;
    return super.update(entity, options);
  }

  deleteAll(where?: Where<T>, options?: Options): Promise<Count> {
    // Do soft delete, no hard delete allowed
    return this.updateAll(
      {
        Deleted: true,
      },
      where,
      options,
    );
  }

  deleteById(id: ID, options?: Options): Promise<void> {
    // Do soft delete, no hard delete allowed
    return super.updateById(
      id,
      {
        Deleted: true,
      },
      options,
    );
  }

  /**
   * Method to perform hard delete of entries. Take caution.
   * @param entity
   * @param options
   */
  deleteHard(entity: T, options?: Options): Promise<void> {
    // Do hard delete
    return super.delete(entity, options);
  }

  /**
   * Method to perform hard delete of entries. Take caution.
   * @param entity
   * @param options
   */
  deleteAllHard(where?: Where<T>, options?: Options): Promise<Count> {
    // Do hard delete
    return super.deleteAll(where, options);
  }

  /**
   * Method to perform hard delete of entries. Take caution.
   * @param entity
   * @param options
   */
  deleteByIdHard(id: ID, options?: Options): Promise<void> {
    // Do hard delete
    return super.deleteById(id, options);
  }
}
