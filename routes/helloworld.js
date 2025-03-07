import express from "express";
import cors from "cors"; // Adicionando CORS para permitir requisições de outros domínios


const router = express.Router();

router.use(cors());
router.use(express.json());


router.get("/helloworld", async (req, res) => {
    try {
        res.json("Hello World");
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments" });
    }
});