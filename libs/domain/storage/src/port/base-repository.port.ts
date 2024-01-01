import { BaseModel } from '@domain/data';

export type RepositoryContext = unknown;

type NewType = BaseModel;

export interface IBaseRepository<Model extends NewType, Context = RepositoryContext> {
  startTransaction<T extends void | Model | null>(execution: (ctx: Context) => Promise<T>): Promise<T>;
  findOne(query: BaseQueryOne<Model>, ctx?: Context): Promise<Model | null>;
  find(query: BaseQueryMany<Model>, ctx?: Context): Promise<Model[]>;
  insertOne(partialModel: Model, ctx?: Context): Promise<Model>;
  updateOne(filter: BaseFilterQuery<Model>, partialModel: UpdatableModel<Model>, ctx?: Context): Promise<Model | null>;
  count(filter: BaseFilterQuery<Model>): Promise<number>;
  upsertOne(filter: BaseFilterQuery<Model>, model: Model, ctx?: Context): Promise<Model>;
  delete(filter: BaseFilterQuery<Model>, ctx?: Context): Promise<void>;
  save(model: Model, ctx?: Context): Promise<Model>;
}

export type BaseFilterQuery<Model extends BaseModel> = Partial<Model>;

export type BaseSortQuery<Model extends BaseModel> = {
  [field in keyof Model]?: 'ASC' | 'DESC';
};

export type BaseSelectQuery<Model extends BaseModel> = Array<keyof Model>;

export type BaseQueryOne<Model extends BaseModel> = {
  filter?: BaseFilterQuery<Model>;
  sort?: BaseSortQuery<Model>;
  select?: BaseSelectQuery<Model>;
};

export type BaseQueryMany<Model extends BaseModel> = BaseQueryOne<Model> & {
  skip?: number;
  limit?: number;
};

export type UpdatableModel<Model extends BaseModel> = Omit<Partial<Model>, 'id' | 'pid' | 'updatedAt' | 'createdAt'>;
