import express from "express";
import authenticateToken from "../middleware/authenticateToken.js"; 
const router = express.Router();
import { getPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postController.js";



router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", authenticateToken, createPost);
router.put("/:id", authenticateToken, updatePost);
router.delete("/:id", authenticateToken, deletePost);

export default router; 
