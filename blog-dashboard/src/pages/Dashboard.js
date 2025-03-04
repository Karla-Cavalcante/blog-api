import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error loading posts:", err));
  }, []);

  const togglePublish = async (id, published) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, { published: !published });
      setPosts(posts.map(post => post.id === id ? { ...post, published: !published } : post));
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/new">Create New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title} {post.published ? "(Published)" : "(Draft)"}</h2>
            <button onClick={() => togglePublish(post.id, post.published)}>
              {post.published ? "Unpublish" : "Publish"}
            </button>
            <Link to={`/edit/${post.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
