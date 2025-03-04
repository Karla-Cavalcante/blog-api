import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkPosts() {
    const posts = await prisma.post.findMany();
    console.log("Database Posts:", posts);
}

checkPosts().finally(() => prisma.$disconnect());
