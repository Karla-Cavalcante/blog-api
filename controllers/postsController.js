import express from "express";
import authenticateJWT from "../middleware/authMiddleware.js";

const router = express.Router();


let posts = [
  { id: 1, title: "Post 1", content: "Conteúdo do post 1", authorId: 1, comments: [] },
  { id: 2, title: "Post 2", content: "Conteúdo do post 2", authorId: 2, comments: [] }
];


router.get("/", (req, res) => {
  res.json(posts);
});


router.post("/", authenticateJWT, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Título e conteúdo são obrigatórios" });
  }
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    authorId: req.user.id,
    comments: []
  };
  posts.push(newPost);
  return res.status(201).json(newPost);
});


router.put("/:id", authenticateJWT, (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ message: "Post não encontrado" });
  }
  if (post.authorId !== req.user.id) {
    return res.status(403).json({ message: "Você não tem permissão para editar este post." });
  }
  post.title = title || post.title;
  post.content = content || post.content;
  return res.status(200).json(post);
});


router.delete("/:id", authenticateJWT, (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post não encontrado" });
  }
  const post = posts[postIndex];
  if (post.authorId !== req.user.id) {
    return res.status(403).json({ message: "Você não tem permissão para excluir este post." });
  }
  posts.splice(postIndex, 1);
  return res.status(200).json({ message: "Post excluído com sucesso" });
});


router.post("/:id/comments", (req, res) => {
  const postId = parseInt(req.params.id);
  const { content } = req.body;
 
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ message: "Post não encontrado" });
  }
  const newComment = { 
    id: post.comments.length + 1, 
    content, 
    authorId: null 
  };
  post.comments.push(newComment);
  return res.status(201).json(newComment);
});

export default router;
