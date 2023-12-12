import React from 'react';
import PostForm from './components/postForm';
import PostList from './components/postList';


function App() {
    return (
        <div className="App">
            <h1>Post App</h1>
            <PostForm />
            <PostList />
        </div>
    );
}

export default App;
