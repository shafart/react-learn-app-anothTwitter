import './styles/App.css'
import React, { useMemo, useState } from 'react';
import PostList from "./components/PostList";
import PostForm from './components/PostForm';

import PostFilter from './components/PostFilter';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript 1', body: 'Description 1' },
    { id: 2, title: 'JavaScript 2', body: 'Description 2' },
    { id: 3, title: 'JavaScript 3', body: 'Description 3' }
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})



  const sortedPosts = useMemo(() => {
    console.log('отработала функция сортедпостчс')
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;

  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo (() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  return (
    <div className="App">
      <PostForm create={createPost}></PostForm>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter 
        filter={filter} 
        setFilter={setFilter}
      />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
    </div>
  );
}

export default App;
