import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"; // Adicionando CORS para permitir requisições de outros domínios

const router = express.Router();
const prisma = new PrismaClient();


// Middleware para permitir requisições de outros domínios e parsear JSON
router.use(cors());
router.use(express.json()); // Adicionando middleware para parsear JSON


router.get("/:id/comments", async (req, res) => {
    const { id } = req.params;

    try {
        const comments = await prisma.comment.findMany({
            where: { postId: Number(id) },
            orderBy: { createdAt: "asc" } // Sort by oldest first
        });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments" });
    }
});


// ✅ Rota para adicionar um comentário a um post
router.post("/:id/comments", async (req, res) => {
    console.log("✅ Received request to add comment"); // Debugging
    console.log("Request body:", req.body); // Verifique o corpo da requisição

    const { id } = req.params;
    const { content, authorId } = req.body;

    // Validação do ID
    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid post ID" });
    }

    // Validação dos campos obrigatórios
    if (!content || !authorId) {
        return res.status(400).json({ message: "Content and authorId are required" });
    }

    try {
        // ✅ Verifique se o post existe
        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
        });

        if (!post) {
            console.log("❌ Post not found");
            return res.status(404).json({ message: "Post not found" });
        }

        // ✅ Crie o comentário
        const newComment = await prisma.comment.create({
            data: {
                content,
                authorId: Number(authorId), // Garanta que authorId seja um número
                postId: Number(id),
            },
        });

        console.log("✅ Comment added:", newComment);
        res.status(201).json(newComment);
    } catch (error) {
        console.error("❌ Error adding comment:", error);
        res.status(500).json({ message: "Error adding comment" });
    }
});

// ✅ Rota para obter todos os posts publicados
router.get("/", async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            orderBy: { createdAt: "desc" }, // ✅ Order by newest first
        });
        res.json(posts);
    } catch (error) {
        console.error("❌ Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// ✅ Route to publish a post
router.put("/:id/publish", async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the post exists
        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // ✅ Update published status to true
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { published: true },
        });

        res.json(updatedPost);
    } catch (error) {
        console.error("❌ Error publishing post:", error);
        res.status(500).json({ message: "Error publishing post" });
    }
});

// ✅ Rota para obter todos os posts (admin)
router.get("/admin", async (req, res) => {
    try {
        const posts = await prisma.post.findMany(); // Fetch all posts
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

// ✅ Create a new post (admin only)
router.post("/", async (req, res) => {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
        return res.status(400).json({ message: "Title, content, and authorId are required" });
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId: Number(authorId),
                published: false, // Default: not published
            },
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error("❌ Error creating post:", error);
        res.status(500).json({ message: "Error creating post" });
    }
});


// ✅ Rota para publicar um post
router.put("/:id/publish", async (req, res) => {
    const { id } = req.params;

    // Validação do ID
    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid post ID" });
    }

    try {
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { published: true },
        });
        res.json(updatedPost);
    } catch (error) {
        console.error("❌ Error publishing post:", error);
        res.status(500).json({ message: "Error publishing post" });
    }
});

// ✅ Rota para despublicar um post
router.put("/:id/unpublish", async (req, res) => {
    const { id } = req.params;

    // Validação do ID
    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid post ID" });
    }

    try {
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { published: false },
        });
        res.json(updatedPost);
    } catch (error) {
        console.error("❌ Error unpublishing post:", error);
        res.status(500).json({ message: "Error unpublishing post" });
    }
});

export default router;