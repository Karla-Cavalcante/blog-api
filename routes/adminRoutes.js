const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { ensureAuthenticated, ensureAdmin } = require("../middleware/auth");

// Show post creation form (Admin only)
router.get("/create", ensureAuthenticated, ensureAdmin, (req, res) => {
  res.render("admin/create-post");
});

// Handle post creation
router.post("/create", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { title, content } = req.body;

    await prisma.post.create({
      data: {
        title,
        content,
        published: true,
        authorId: req.user.id,
      },
    });

    res.redirect("/"); // Redirect to homepage after creation
  } catch (error) {
    res.status(500).send("Error creating post");
  }
});

module.exports = router;
