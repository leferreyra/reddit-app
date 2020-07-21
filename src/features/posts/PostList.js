import React from 'react';
import PostListItem from 'features/posts/PostListItem';
import styles from './PostList.module.css';

export default function PostList() {
  return (
    <div className={styles.list}>
      <div className={styles.post}>
        <PostListItem />
      </div>
      <div className={styles.post}>
        <PostListItem />
      </div>
      <div className={styles.post}>
        <PostListItem />
      </div>
      <div className={styles.post}>
        <PostListItem />
      </div>
      <div className={styles.post}>
        <PostListItem />
      </div>
      <div className={styles.post}>
        <PostListItem />
      </div>
    </div>
  );
}
