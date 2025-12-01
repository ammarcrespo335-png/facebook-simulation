"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBRepo = void 0;
class DBRepo {
    model;
    constructor(model) {
        this.model = model;
    }
    find = async ({ filter = {}, Projection = {}, options = {}, }) => {
        const docs = await this.model.find(filter, Projection, options).lean();
        return docs;
    };
    findOne = async ({ filter = {}, Projection = {}, options = {}, }) => {
        const doc = await this.model.findOne(filter, Projection, options);
        return doc;
    };
    findById = async ({ id, Projection = {}, options = {}, }) => {
        const doc = await this.model.findById(id, Projection, options);
        return doc;
    };
    create = async ({ data, options = {}, }) => {
        const [doc] = await this.model.create([data], {
            ...options,
            validateBeforeSave: true,
        });
        return doc;
    };
    insertMany = async ({ docs }) => {
        const CreatedDocs = await this.model.insertMany(docs);
        return CreatedDocs;
    };
    findOneAndDelete = async ({ filter, options = {}, }) => {
        const doc = await this.model.findOneAndDelete(filter, options);
        return doc;
    };
    findOneAndUpdate = async ({ filter, update, options = {}, }) => {
        const doc = await this.model.findOneAndUpdate(filter, update, {
            ...options,
            new: true,
        });
        return doc;
    };
    findByIdAndDelete = async ({ id, options = {}, }) => {
        const doc = await this.model.findByIdAndDelete(id, options);
        return doc;
    };
    findByIdAndUpdate = async ({ id, update, options = {}, }) => {
        const doc = await this.model.findByIdAndUpdate(id, update, options);
        return doc;
    };
}
exports.DBRepo = DBRepo;
