import './styles/App.css'
import React, { useState } from 'react';
import PostList from "./components/PostList";
import PostForm from './components/PostForm';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript 1', body: 'Description 1' },
    { id: 2, title: 'JavaScript 2', body: 'Description 2' },
    { id: 3, title: 'JavaScript 3', body: 'Description 3' }
  ])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }


  return (
    <div className="App">

      <PostForm create={createPost}></PostForm>
      <PostList posts={posts} title="Список постов 1" />

    </div>
  );
}

export default App;
