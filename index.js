import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sequelize from "./config/database.js";
import User from "./models/User.js";
import authenticateJWT from "./middleware/authMiddleware.js";
import postsRouter from "./controllers/postsController.js"; 

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());


sequelize.sync()
  .then(() => console.log("Banco de dados sincronizado!"))
  .catch((err) => console.error("Erro ao conectar ao banco:", err));


app.post("/api/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    console.log(`Tentando login com: ${name}`);
    const user = await User.findOne({ where: { name } });
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
});


app.use("/api/posts", postsRouter);


app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
