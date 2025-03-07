import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { fileURLToPath } from "url"; 
import cors from "cors"; 

import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 

dotenv.config();
const app = express();
const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors()); 



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));


app.use("/api/auth", authRoutes); 
app.use("/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.put("/posts/:id/publish", async (req, res) => {
    const { id } = req.params;

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



app.get("/posts/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
            include: { comments: true } 
        });

        if (!post) return res.status(404).send("Post not found");

        res.render("post", { post });
    } catch (error) {
        res.status(500).send("Error loading post");
    }
});



app.get("/", async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true }
        });
        
        console.log("Posts sent to EJS:", posts); 
        res.render("home", { posts });
    } catch (error) {
        console.error("🔥 Error loading posts:", error);
        res.status(500).send("Error loading posts: " + error.message);
    }
});


app.get("/hello", async (req, res) => {
    try {
        res.json({Response:"Hello World"}); 
    } catch (error) {
        console.error("🔥 Error loading posts:", error);
        res.status(500).send("Error loading posts: " + error.message);
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));