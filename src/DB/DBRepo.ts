import {
  CreateOptions,
  Model,
  ProjectionType,
  QueryOptions,
  RootFilterQuery,
  Types,
} from 'mongoose'

export abstract class DBRepo<T> {
  constructor(protected readonly model: Model<T>) {}
  find = async ({
    filter = {},
    Projection = {},
    options = {},
  }: {
    filter?: RootFilterQuery<T>
    Projection?: ProjectionType<T>
    options?: QueryOptions
  }) => {
    const docs = await this.model.find(filter, Projection, options)
    return docs
  }
  findOne = async ({
    filter = {},
    Projection = {},
    options = {},
  }: {
    filter?: RootFilterQuery<T>
    Projection?: ProjectionType<T>
    options?: QueryOptions
  }) => {
    const doc = await this.model.findOne(filter, Projection, options)
    return doc
  }

  findById = async ({
    id,
    Projection = {},
    options = {},
  }: {
    id: Types.ObjectId | String
    Projection?: ProjectionType<T>
    options?: QueryOptions
  }) => {
    const doc = await this.model.findById(id, Projection, options)
    return doc
  }
  create = async ({
    data,
    options = {},
  }: {
    data: Partial<T>
    options?: CreateOptions
  }) => {
    const [doc] = await this.model.create([data], {
      ...options,
      validateBeforeSave: true,
    })
    return doc
  }
}
