"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBRepo = void 0;
class DBRepo {
    model;
    constructor(model) {
        this.model = model;
    }
    find = async ({ filter = {}, Projection = {}, options = {}, }) => {
        const docs = await this.model.find(filter, Projection, options);
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
}
exports.DBRepo = DBRepo;
