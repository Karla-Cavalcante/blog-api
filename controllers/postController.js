import prisma from "../prismaClient.js"; 

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({ include: { comments: true } });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
};

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
            include: { comments: true }, 
        });

        if (!post) return res.status(404).send("Post not found");

        res.render("post", { post });
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).send("Error fetching post");
    }
};




export const createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = await prisma.post.create({
            data: { title, content, authorId: req.user.id },
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { title, content },
        });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.post.delete({ where: { id: Number(id) } });
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
};
