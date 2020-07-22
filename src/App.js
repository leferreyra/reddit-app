import React, { useEffect } from 'react';
import PostList from 'features/posts/PostList'
import PostDetail from 'features/posts/PostDetail'
import cx from 'classnames';
import { fetchTopPosts } from 'features/posts/postsSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './App.module.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopPosts());
  }, [dispatch])

  const { selectedPostId } = useParams();

  const classes = cx(styles.container, {
    [styles.selected]: selectedPostId
  });

  return (
      <div className={classes}>
        <div className={styles.posts}>
          <div className={styles.list}>
            <PostList />
          </div>
          <div className={styles.detail}>
            <PostDetail />
          </div>
        </div>
      </div>
  );
}

export default App;
