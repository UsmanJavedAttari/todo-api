import {Entity, property} from '@loopback/repository';

/**
 * Abstract base class for all soft-delete enabled models
 *
 * @description
 * Base class for all soft-delete enabled models created.
 * It adds a `Deleted` attribute to the model class for handling soft-delete.
 * Its an abstract class so no repository class should be based on this.
 */
export abstract class BaseModel extends Entity {
    @property({
        type: 'boolean',
        jsonSchema: {
            nullable: true,
        },
    })
    Deleted: boolean;

    @property({
        type: 'date',
        jsonSchema: {
            nullable: true,
        },
    })
    Created?: Date;

    @property({
        type: 'date',
        jsonSchema: {
            nullable: true,
        },
    })
    Updated?: Date;

    constructor(data?: Partial<BaseModel>) {
        super(data);
    }
}
