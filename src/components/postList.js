import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../api/postsSlice';// Импорт fetchPosts и deletePost из файла postsSlice

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());// Загрузка постов при первой загрузке компонента
    }, [dispatch]);

    const handleDelete = (postId) => {
        dispatch(deletePost(postId));
    };

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    {post.title} - {post.body}
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default PostList;
