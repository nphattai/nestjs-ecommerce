import { BaseModel } from '@domain/data';
import { instanceToPlain } from 'class-transformer';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { BaseQueryMany, BaseQueryOne, IBaseRepository, UpdatableModel } from '../port';
import { PGBaseEntity } from './pg-base.entity';

export type PGContext = {
  manager: EntityManager;
};

export abstract class PGBaseRepository<Entity extends PGBaseEntity, Model extends BaseModel>
  implements IBaseRepository<Model, PGContext>
{
  protected constructor(protected readonly repo: Repository<Entity>) {}

  abstract _entityToModel(entity: Entity | null): Model | null;

  protected modelToEntity(model: Model): Entity {
    return this.repo.create(instanceToPlain({ ...model, updatedAt: new Date() }) as unknown as DeepPartial<Entity>);
  }

  startTransaction<T extends void | Model | null>(execution: (ctx: PGContext) => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  findOne(query: BaseQueryOne<Model>, ctx?: PGContext | undefined): Promise<Model | null> {
    throw new Error('Method not implemented.');
  }

  find(query: BaseQueryMany<Model>, ctx?: PGContext | undefined): Promise<Model[]> {
    throw new Error('Method not implemented.');
  }

  async insertOne(partialModel: Model, ctx?: PGContext | undefined): Promise<Model> {
    let created: Entity;
    const entity = this.modelToEntity(partialModel);
    if (ctx?.manager) {
      created = await ctx?.manager.save(entity);
    } else {
      created = await this.repo.save(entity);
    }

    return this._entityToModel(created);
  }

  updateOne(
    filter: Partial<Model>,
    partialModel: UpdatableModel<Model>,
    ctx?: PGContext | undefined
  ): Promise<Model | null> {
    throw new Error('Method not implemented.');
  }

  count(filter: Partial<Model>): Promise<number> {
    throw new Error('Method not implemented.');
  }

  upsertOne(filter: Partial<Model>, model: Model, ctx?: PGContext | undefined): Promise<Model> {
    throw new Error('Method not implemented.');
  }

  delete(filter: Partial<Model>, ctx?: PGContext | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }

  save(model: Model, ctx?: PGContext | undefined): Promise<Model> {
    throw new Error('Method not implemented.');
  }
}
