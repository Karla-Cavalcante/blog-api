const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/teste", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });

    res.render("index", { posts });
  } catch (error) {
    res.status(500).send("Error fetching posts");
  }
});

module.exports = router;
