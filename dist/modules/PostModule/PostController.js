"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouter = void 0;
const GetAllPosts_1 = require("./PostServices/GetAllPosts");
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const ValidationMiddleware_1 = __importDefault(require("../../middleware/ValidationMiddleware"));
const PostSchema_1 = require("./PostSchema");
const ReactToPost_1 = require("./PostServices/ReactToPost");
const GetSinglePost_1 = require("./PostServices/GetSinglePost");
const UpdatePost_1 = require("./PostServices/UpdatePost");
const DeletePost_1 = require("./PostServices/DeletePost");
const GetMyPosts_1 = require("./PostServices/GetMyPosts");
const CreatePost_1 = require("./PostServices/CreatePost");
exports.PostRouter = (0, express_1.Router)();
// Create Post
const createPostService = new CreatePost_1.CreatePost();
exports.PostRouter.post('/Create-Post', authMiddleware_1.auth, (0, ValidationMiddleware_1.default)(PostSchema_1.CreatePostSchema), createPostService.CreatePost.bind(createPostService));
// Get All Posts
const getAllPostsService = new GetAllPosts_1.GetAllPosts();
exports.PostRouter.get('/Get-All-Posts', authMiddleware_1.auth, getAllPostsService.GetAllPosts.bind(getAllPostsService));
// Get Single Post
const getSinglePostService = new GetSinglePost_1.GetSinglePost();
exports.PostRouter.get('/get-single-post/:postId', authMiddleware_1.auth, getSinglePostService.getSinglePost.bind(getSinglePostService));
// Update Post
const updatePostService = new UpdatePost_1.UpdatePost();
exports.PostRouter.patch('/update-post/:postId', authMiddleware_1.auth, updatePostService.UpdatePost.bind(updatePostService));
// delete Post
const deletePostService = new DeletePost_1.DeletePost();
exports.PostRouter.delete('/delete-post/:postId', authMiddleware_1.auth, deletePostService.DeletePost.bind(deletePostService));
// React to Post
const reactToPostService = new ReactToPost_1.ReactToPost();
exports.PostRouter.patch('/react-post/:postId', authMiddleware_1.auth, reactToPostService.reactToPost.bind(reactToPostService));
// get all my Posts
const getMyPostsService = new GetMyPosts_1.getMyPosts();
exports.PostRouter.get('/get-my-posts', authMiddleware_1.auth, getMyPostsService.getMyPosts.bind(getMyPostsService));
