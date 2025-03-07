import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const PostControls = ({ postId }) => {
    const { user } = useContext(AuthContext);

    const publishPost = async () => {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}/publish`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response.ok) {
            alert("Post published!");
        } else {
            alert("Failed to publish post.");
        }
    };

    return (
        <>
            {user?.role === "admin" && (
                <button onClick={publishPost}>Publish</button>
            )}
        </>
    );
};

export default PostControls;
