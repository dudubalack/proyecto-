import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: '', content: '' });

    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        })
        .then(res => res.json())
        .then(() => navigate('/listado-post'));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
            />
            <textarea
                name="content"
                value={post.content}
                onChange={handleChange}
            />
            <button type="submit">Update Post</button>
        </form>
    );
};

export default EditPost;
