const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllPostsAdmin(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
        published: true,
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
}
async function createPost(req, res) {
  try {
    const { title, content, published } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
      },
    });
    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ error: "An error occurred while creating post" });
  }
}
async function updatePost(req, res) {
  try {
    const postID = req.params.postID;

    const updatedPost = await prisma.post.update({
      where: { id: postID },
      data: req.body,
    });
    res.status(200).json({ message: "Post updated", updatedPost });
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ error: "An error occurred while updating post" });
  }
}
async function deletePost(req, res) {
  try {
    const postID = req.params.postID;

    //since i didnt add cascade on the original ORM model
    await prisma.comment.deleteMany({
      where: { postID: postID },
    });
    await prisma.post.delete({
      where: { id: postID },
    });
    res.status(200).json({ message: "Post and comments deleted" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ error: "An error occurred while deleting post" });
  }
}
async function deleteComment(req, res) {
  try {
    const commentID = req.params.commentID;
    await prisma.comment.delete({ where: { id: commentID } });
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    res.status(500).json({ error: "An error occurred while deleting comment" });
  }
}

module.exports = {
  getAllPostsAdmin,
  createPost,
  updatePost,
  deletePost,
  deleteComment,
};
