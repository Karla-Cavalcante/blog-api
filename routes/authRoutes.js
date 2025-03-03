import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
    const { email, password, username, isAdmin } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
                isAdmin: isAdmin || false, 
            },
        });

        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.error("🔥 Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
});

export default router;
