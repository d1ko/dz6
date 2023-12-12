//Тяжко,не так тяжко как адаптивизация,но было очень душно,и комменты ещё писать.........
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://dummyjson.com/todos');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data); // Возвращаем данные об ошибке при неудачной загрузке
    }
});

export const createPost = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://dummyjson.com/todos/add', postData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data); // Возвращаем данные об ошибке при неудачном создании поста
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { rejectWithValue }) => {
    try {
        await axios.delete(`https://dummyjson.com/todos/${postId}`);
        return postId;
    } catch (error) {
        return rejectWithValue(error.response.data); // Возвращаем данные об ошибке при неудачном удалении поста
    }
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: { data: [], status: 'idle', error: null }, // Начальное состояние, включая статус и ошибку
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'; // Устанавливаем статус loading при начале загрузки
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Устанавливаем статус succeeded при успешной загрузке
                state.data = action.payload; // Обновляем данные в состоянии с полученными данными
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'; // Устанавливаем статус failed при ошибке загрузки
                state.error = action.payload; // Сохраняем данные об ошибке
            })
            .addCase(createPost.pending, (state) => {
                state.status = 'loading'; // Устанавливаем статус loading при начале создания поста
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Устанавливаем статус succeeded при успешном создании поста
                state.data.push(action.payload); // Добавляем новый пост к данным в состоянии
            })
            .addCase(createPost.rejected, (state, action) => {
                state.status = 'failed'; // Устанавливаем статус failed при ошибке создания поста
                state.error = action.payload; // Сохраняем данные об ошибке
            })
            .addCase(deletePost.pending, (state) => {
                state.status = 'loading'; // Устанавливаем статус loading при начале удаления поста
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Устанавливаем статус succeeded при успешном удалении поста
                state.data = state.data.filter((post) => post.id !== action.payload); // Удаляем пост из данных в состоянии
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = 'failed'; // Устанавливаем статус failed при ошибке удаления поста
                state.error = action.payload; // Сохраняем данные об ошибке
            });
    },
});

export default postsSlice.reducer;
