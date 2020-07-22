import React, { useEffect } from 'react';
import PostList from 'features/posts/PostList'
import PostDetail from 'features/posts/PostDetail'
import { fetchTopPosts } from 'features/posts/postsSlice';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './App.module.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopPosts());
  }, [dispatch])

  return (
    <Router>
      <div className={styles.container}>
        <div className={styles.posts}>
          <Switch>
            <Route path="/:selectedPostId?">
              <div className={styles.list}>
                <PostList />
              </div>
              <div className={styles.detail}>
                <PostDetail />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
