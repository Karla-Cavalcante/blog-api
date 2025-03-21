import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado" });
    }

    req.user = user; 
    next();
  });
};

export default authenticateJWT;
