import React, { useEffect } from 'react';
import PostList from 'features/posts/PostList'
import { fetchTopPosts } from 'features/posts/postsSlice';
import { useDispatch } from 'react-redux';
import styles from './App.module.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopPosts());
  }, [dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <div className={styles.list}>
          <PostList />
        </div>
        <div className={styles.detail}>detail</div>
      </div>
    </div>
  );
}

export default App;
