import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../api/postsSlice';// Импорт createPost из файла postsSlice

const PostForm = () => {
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({ title: '', body: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(postData)); // Вызов createPost из action с данными формы
        setPostData({ title: '', body: '' }); // Очистка формы после отправки
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Body"
                value={postData.body}
                onChange={(e) => setPostData({ ...postData, body: e.target.value })}
            />
            <button type="submit">Create Post</button>
        </form>
    );
};

export default PostForm;
