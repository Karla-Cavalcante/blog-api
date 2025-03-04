const publishPost = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/posts/${id}/publish`, {
            method: "PUT",
        });
        if (!response.ok) {
            throw new Error("Failed to publish post");
        }
        alert("Post published successfully!");
        fetchPosts(); // ✅ Refresh posts after publishing
    } catch (error) {
        console.error("❌ Error publishing post:", error);
    }
};

return (
    <div>
        <h1>Admin Dashboard</h1>
        <h2>Posts</h2>
        <button onClick={fetchPosts}>Refresh Posts</button>
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    {post.title} - {post.published ? "✅ Published" : "❌ Unpublished"}
                    {!post.published && <button onClick={() => publishPost(post.id)}>Publish</button>}
                </li>
            ))}
        </ul>
    </div>
);
