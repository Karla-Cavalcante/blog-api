import { useEffect, useState } from "react";

const BlogHome = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:3000/posts");
            if (!response.ok) throw new Error("Failed to fetch posts");
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("❌ Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            <button onClick={fetchPosts}>Refresh Posts</button>
            <ul>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id}>
                            <a href={`/posts/${post.id}`}>{post.title}</a>
                        </li>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </ul>
        </div>
    );
};

export default BlogHome;
