"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRouter = void 0;
const express_1 = require("express");
const CreateComment_1 = require("./CommentService/CreateComment");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const ValidationMiddleware_1 = __importDefault(require("../../middleware/ValidationMiddleware"));
const CommentSchema_1 = require("./CommentSchema");
const DeleteComment_1 = require("./CommentService/DeleteComment");
const UpdateComment_1 = require("./CommentService/UpdateComment");
const ReactToComment_1 = require("./CommentService/ReactToComment");
const GetAllComments_1 = require("./CommentService/GetAllComments");
exports.CommentRouter = (0, express_1.Router)();
//create-comment
const createCommentService = new CreateComment_1.CreateComment();
exports.CommentRouter.post('/create-comment', authMiddleware_1.auth, (0, ValidationMiddleware_1.default)(CommentSchema_1.CreateCommentSchema), createCommentService.CreateComment.bind(createCommentService));
//get-all-comments
const getAllComments = new GetAllComments_1.GetAllComments();
exports.CommentRouter.get('/Get-Comments/:postId', authMiddleware_1.auth, getAllComments.getAllComments.bind(getAllComments));
//Delete-comment
const deleteComment = new DeleteComment_1.DeleteComment();
exports.CommentRouter.delete('/delete-comment/:commentId', authMiddleware_1.auth, deleteComment.deleteComment.bind(deleteComment));
//update-Comments
const updateComment = new UpdateComment_1.UpdateComment();
exports.CommentRouter.patch('/update-comment/:commentId', authMiddleware_1.auth, updateComment.updateComment.bind(updateComment));
//React-to-comments
const reactToComments = new ReactToComment_1.ReactToComment();
exports.CommentRouter.post('/react-to-comment/:commentId', authMiddleware_1.auth, reactToComments.reactToComment.bind(reactToComments));
