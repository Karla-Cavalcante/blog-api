import { useEffect, useState } from "react";
import axios from "axios";

const BlogHome = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/posts"); // ✅ Fetch only published posts
            setPosts(response.data);
            console.log("✅ Fetched posts:", response.data);
        } catch (error) {
            console.error("❌ Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts(); // ✅ Call function correctly inside useEffect
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
