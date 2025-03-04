import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Fetch all posts (for the dashboard)
router.get("/admin", async (req, res) => {
    try {
        const posts = await prisma.post.findMany(); // Fetch all posts
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// Fetch only published posts (for public blog)
router.get("/", async (req, res) => {
    try {
        const posts = await prisma.post.findMany({ where: { published: true } });
        res.json(posts);
    } catch (error) {
        console.error("Error fetching published posts:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// Create a new post (unpublished by default)
router.post("/", async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = await prisma.post.create({
            data: { title, content, published: false },
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Error creating post" });
    }
});

// Update post (including publish/unpublish)
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content, published } = req.body;
    try {
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { title, content, published },
        });
        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Error updating post" });
    }
});

// Publish a post
router.put("/:id/publish", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.update({
            where: { id: Number(id) },
            data: { published: true },
        });
        res.json({ message: "Post published", post });
    } catch (error) {
        console.error("Error publishing post:", error);
        res.status(500).json({ message: "Error publishing post" });
    }
});

// Unpublish a post
router.put("/:id/unpublish", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.update({
            where: { id: Number(id) },
            data: { published: false },
        });
        res.json({ message: "Post unpublished", post });
    } catch (error) {
        console.error("Error unpublishing post:", error);
        res.status(500).json({ message: "Error unpublishing post" });
    }
});

export default router;

