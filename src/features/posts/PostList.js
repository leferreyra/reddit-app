import React from 'react';
import PostListItem from 'features/posts/PostListItem';
import { useSelector } from 'react-redux';
import styles from './PostList.module.css';

export default function PostList() {

  const posts = useSelector(state => state.posts.list);

  return (
    <div className={styles.list}>
      {posts.map(postId => (
        <div className={styles.post} key={postId}>
          <PostListItem postId={postId} />
        </div>
      ))}
    </div>
  );
}
