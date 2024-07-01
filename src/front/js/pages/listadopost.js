import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ListadoPost = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getPosts();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            fetch(`/api/posts/${id}`, { method: 'DELETE' })
                .then(() => actions.getPosts());
        }
    };

    return (
        <div className="container">
            {store.posts.map(post => (
                <div key={post.id} className="post-item">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <Link to={`/post/${post.id}`}>
                        <button>View</button>
                    </Link>
                    <Link to={`/edit/${post.id}`}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ListadoPost;
