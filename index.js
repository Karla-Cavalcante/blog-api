import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { fileURLToPath } from "url"; 

import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 

dotenv.config();
const app = express();
const prisma = new PrismaClient();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes); 
app.use("/api/posts", postRoutes);
app.use("/", commentRoutes); 




app.get("/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
            include: { comments: true },
        });
        if (!post) return res.status(404).send("Post not found");
        res.render("post", { post });
    } catch (error) {
        res.status(500).send("Error loading post");
    }
});


app.get("/", async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.render("home", { posts });
    } catch (error) {
        console.error("🔥 Prisma Error:", error);
        res.status(500).send("Error loading posts: " + error.message);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
