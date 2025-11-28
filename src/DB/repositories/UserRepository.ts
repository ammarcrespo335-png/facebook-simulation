import {
  CreateOptions,
  Model,
  ProjectionType,
  QueryOptions,
  RootFilterQuery,
  Types,
  UpdateQuery,
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
    const docs = await this.model.find(filter, Projection, options).lean()
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
    id: Types.ObjectId | string
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

  insertMany = async ({ docs }: { docs: Array<Partial<T>> }) => {
    const CreatedDocs = await this.model.insertMany(docs)
    return CreatedDocs
  }
  findOneAndDelete = async ({
    filter,
    options = {},
  }: {
    filter: RootFilterQuery<T>
    options?: QueryOptions
  }) => {
    const doc = await this.model.findOneAndDelete(filter, options)
    return doc
  }

  findOneAndUpdate = async ({
    filter,
    update,
    options = {},
  }: {
    filter: RootFilterQuery<T>
    update: UpdateQuery<T>
    options?: QueryOptions
  }) => {
    const doc = await this.model.findOneAndUpdate(filter, update, {
      ...options,
      new: true,
    })
    return doc
  }
  findByIdAndDelete = async ({
    id,
    options = {},
  }: {
    id: Types.ObjectId | string
    options?: QueryOptions
  }) => {
    const doc = await this.model.findByIdAndDelete(id, options)
    return doc
  }
  findByIdAndUpdate = async ({
    id,
    update,
    options = {},
  }: {
    id: Types.ObjectId | string
    update: UpdateQuery<T>
    options?: QueryOptions
  }) => {
    const doc = await this.model.findByIdAndUpdate(id, update, options)
    return doc
  }
}
