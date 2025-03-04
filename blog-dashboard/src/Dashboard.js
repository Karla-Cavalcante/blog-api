import { useEffect, useState } from "react";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:3000/posts/admin");
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

    const createPost = async () => {
        try {
            const response = await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: "New Admin Post",
                    content: "This is a new post created from Admin Dashboard.",
                    authorId: 1, // ⚠️ Update this to a valid user ID from your database
                }),
            });

            if (!response.ok) throw new Error("Failed to create post");

            fetchPosts(); // Refresh posts after creating
        } catch (error) {
            console.error("❌ Error creating post:", error);
        }
    };

    const publishPost = async (postId) => {
        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}/publish`, {
                method: "PUT",
            });

            if (!response.ok) throw new Error("Failed to publish post");

            fetchPosts(); // Refresh after publishing
        } catch (error) {
            console.error("❌ Error publishing post:", error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Posts</h2>
            <button onClick={fetchPosts}>Refresh Posts</button>
            <button onClick={createPost}>Create New Post</button>
            <ul>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id}>
                            {post.title} - {post.published ? "✅ Published" : "❌ Unpublished"}
                            {!post.published && (
                                <button onClick={() => publishPost(post.id)}>Publish</button>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </ul>
        </div>
    );
};

export default Dashboard;
