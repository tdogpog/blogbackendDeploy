const { Router } = require("express");
const { jwtVerify } = require("../util/jwtVerify");
const {
  getAllPostsAdmin,
  createPost,
  updatePost,
  deletePost,
  deleteComment,
} = require("../controllers/adminController");
const {
  getPost,
  getComments,
  createComment,
} = require("../controllers/postController");

const adminRouter = Router();

if (!jwtVerify) console.error("jwtVerify is undefined");

//gets
adminRouter.get("/posts", jwtVerify, getAllPostsAdmin); //all posts regardless of published boolean
//gets using postController funcs
adminRouter.get("/posts/:postID", getPost); //specific post
adminRouter.get("/posts/:postID/comments", getComments); // comments under specific post

//posts
adminRouter.post("/posts", jwtVerify, createPost); // creating a new post
//posts using postController
adminRouter.post("/:postID/comments", createComment); //make a comment

//puts
adminRouter.put("/:postID", jwtVerify, updatePost);

//deletes
adminRouter.delete("/:postID", jwtVerify, deletePost);
adminRouter.delete("/:postID/comments/:commentID", jwtVerify, deleteComment);

module.exports = adminRouter;
