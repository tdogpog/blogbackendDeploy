const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { published: true },
      select: {
        id: true,
        title: true,
        createdAt: true, // Select only the necessary fields
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
}

async function getPost(req, res) {
  try {
    const postID = req.params.postID;
    if (!postID) {
      return res.status(400).json({ error: "Invalid or missing post ID" });
    }
    const post = await prisma.post.findUnique({
      where: { id: postID },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        published: true,
      },
    });
    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error.message); // Log the error
    res.status(500).json({ error: "Internal server error" }); // Handle server error
  }
}
async function getComments(req, res) {
  try {
    const postID = req.params.postID;
    if (!postID) {
      return res.status(400).json({ error: "Invalid or missing post ID" });
    }
    const comments = await prisma.comment.findMany({
      where: { postID: postID },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        content: true,
        postID: true,
        createdAt: true,
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error.message); // Log the error
    res.status(500).json({ error: "Internal server error" }); // Handle server error
  }
}
async function createComment(req, res) {
  try {
    const postID = req.params.postID;
    const { commentName, commentContent } = req.body;
    if (!postID || !commentName || !commentContent) {
      return res
        .status(400)
        .json({ error: "Issue with extracting, Post ID, name, or content" });
    }
    const newComment = await prisma.comment.create({
      data: {
        name: commentName,
        content: commentContent,
        postID: postID,
      },
    });
    res.status(201).json(newComment); // Return the created comment
  } catch (error) {
    console.error("Error posting comment:", error.message); // Log the error
    res.status(500).json({ error: "Internal server error" }); // Handle server error
  }
}

module.exports = { getAllPosts, getPost, getComments, createComment };
