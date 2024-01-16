import { BaseModel } from '@domain/data';
import { instanceToPlain } from 'class-transformer';
import {
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseQueryMany, BaseQueryOne, BaseSelectQuery, IBaseRepository, UpdatableModel } from '../port';
import { PGBaseEntity } from './pg-base.entity';
import { Logger } from '@nestjs/common';

export type PGContext = {
  manager: EntityManager;
};

export abstract class PGBaseRepository<Entity extends PGBaseEntity, Model extends BaseModel>
  implements IBaseRepository<Model, PGContext>
{
  protected constructor(protected readonly repo: Repository<Entity>, protected readonly logger: Logger) {}

  abstract _entityToModel(entity: Entity | null): Model | null;

  protected modelToEntity(model: Model): Entity {
    return this.repo.create(instanceToPlain({ ...model, updatedAt: new Date() }) as unknown as DeepPartial<Entity>);
  }

  startTransaction<T extends void | Model | null>(execution: (ctx: PGContext) => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async findOne(query: BaseQueryOne<Model>, ctx?: PGContext | undefined): Promise<Model | null> {
    const options = this.craftFindOption(query);

    let entity: Entity | null;

    if (ctx?.manager) {
      entity = await ctx?.manager.findOne(this.repo.target, options);
    } else {
      entity = await this.repo.findOne(options);
    }

    return entity ? this._entityToModel(entity) : null;
  }

  async find(query: BaseQueryMany<Model>, ctx?: PGContext | undefined): Promise<Model[]> {
    const options = this.craftFindOption(query);

    let entity: Entity[] = [];

    if (ctx?.manager) {
      entity = await ctx?.manager.find(this.repo.target, options);
    } else {
      entity = await this.repo.find(options);
    }

    return entity.map((e) => this._entityToModel(e)!);
  }

  async insertOne(partialModel: Model, ctx?: PGContext | undefined): Promise<Model> {
    try {
      let created: Entity;
      const entity = this.modelToEntity(partialModel);
      if (ctx?.manager) {
        created = await ctx.manager.save(entity);
      } else {
        created = await this.repo.save(entity);
      }

      return this._entityToModel(created)!;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateOne(
    filter: Partial<Model>,
    partialModel: UpdatableModel<Model>,
    ctx?: PGContext | undefined
  ): Promise<Model | null> {
    const existed = await this.findOne({ filter }, ctx);
    if (!existed) {
      return null;
    }

    Object.keys(partialModel).forEach((key) => {
      // @ts-ignore
      if (partialModel[key] === undefined) {
        // @ts-ignore
        delete partialModel[key];
      }
    });

    const result = await this.save({ ...existed, ...partialModel }, ctx);

    return result;
  }

  async count(filter: Partial<Model>): Promise<number> {
    const options = this.craftFindOption({ filter });
    return this.repo.count(options);
  }

  upsertOne(filter: Partial<Model>, model: Model, ctx?: PGContext | undefined): Promise<Model> {
    throw new Error('Method not implemented.');
  }

  delete(filter: Partial<Model>, ctx?: PGContext | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async save(model: Model, ctx?: PGContext): Promise<Model> {
    const entity = this.modelToEntity(model);
    const updated = ctx?.manager
      ? await ctx.manager.save<Entity>(entity, { reload: true })
      : await this.repo.save<Entity>(entity, { reload: true });
    return this._entityToModel(updated)!;
  }

  protected craftFindOption(query: BaseQueryMany<Model>): FindOneOptions<Entity> & FindManyOptions<Entity> {
    const { filter, sort, select, skip, limit } = query;
    const options: FindOneOptions<Entity> & FindManyOptions<Entity> = { where: {} };

    if (filter) options.where = { ...filter } as FindOptionsWhere<Entity>;

    if (sort) options.order = sort as FindOptionsOrder<Entity>;

    if (select) options.select = this.mapSelectQuery(select);

    if (skip) options.skip = skip;

    if (limit) options.take = limit;

    return options;
  }

  protected mapSelectQuery(select: BaseSelectQuery<Model>): FindOptionsSelect<Entity> {
    const s: FindOptionsSelect<Entity> = {};
    for (const field of select) {
      // @ts-ignore
      s[field as any] = true;
    }

    return s;
  }
}
