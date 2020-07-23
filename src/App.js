import React from 'react';
import PostList from 'features/posts/PostList'
import PostDetail from 'features/posts/PostDetail'
import cx from 'classnames';
import { dismissAll } from 'features/posts/postsSlice';
import { useDispatch } from 'react-redux';
import { useParams, Link} from 'react-router-dom';
import { ReactComponent as CloseIcon } from 'images/close.svg';
import styles from './App.module.css';

function App() {

  const dispatch = useDispatch();

  const { selectedPostId } = useParams();

  const classes = cx(styles.container, {
    [styles.selected]: selectedPostId
  });

  const onDismissAll = () => {
    dispatch(dismissAll());
  }

  return (
      <div className={classes}>
        <div className={styles.posts}>
          <div className={styles.list}>
            <button className={styles.dismissAllButton} onClick={onDismissAll}>
              <CloseIcon />
              dismiss all
            </button>
            <PostList />
          </div>
          <div className={styles.detail}>
            <Link to="/" className={styles.back}>← Back</Link>
            <PostDetail />
          </div>
        </div>
      </div>
  );
}

export default App;
