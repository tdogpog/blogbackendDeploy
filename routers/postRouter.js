const { Router } = require("express");
const {
  getAllPosts,
  getPost,
  getComments,
  createComment,
} = require("../controllers/postController");

const postRouter = Router();

//gets
postRouter.get("/", getAllPosts); //all user viewable posts
postRouter.get("/:postID", getPost); //specific post
postRouter.get("/:postID/comments", getComments); // comments under specific post

//posts
postRouter.post("/:postID/comments", createComment); //make a comment

module.exports = postRouter;
