const prisma = require("../prismaClient");

const addComment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const newComment = await prisma.comment.create({
            data: {
                text,
                postId: Number(id),
                userId: req.user.id,
            },
        });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Error adding comment" });
    }
};

const getComments = async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await prisma.comment.findMany({ where: { postId: Number(id) } });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments" });
    }
};

module.exports = { addComment, getComments };
