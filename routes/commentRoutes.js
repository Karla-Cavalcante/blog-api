import express from "express";
import { PrismaClient } from "@prisma/client";  
const prisma = new PrismaClient();  

const router = express.Router();


router.post("/posts/:postId/comments", async (req, res) => {
    const { postId } = req.params;
    const { content, authorId } = req.body; 


    if (!authorId || isNaN(Number(authorId))) {
        return res.status(400).send("Invalid author ID");
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                postId: Number(postId),
                authorId: Number(authorId),  
            },
        });

        res.redirect(`/posts/${postId}`);
    } catch (error) {
        console.error("🔥 Error adding comment:", error);
        res.status(500).send("Error adding comment: " + error.message);
    }
});




export default router;
