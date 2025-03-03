const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async () => {
    try {
        const newPost = await prisma.post.create({
            data: {
                title: "My First Post",
                content: "This is a test post.",
                authorId: 1, // ⚠️ Make sure user ID 1 exists in the database
            },
        });

        console.log("Post added!", newPost);
    } catch (error) {
        console.error("Error adding post:", error);
    } finally {
        await prisma.$disconnect();
    }
})();
