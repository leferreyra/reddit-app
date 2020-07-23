import React from 'react';
import PostListItem from 'features/posts/PostListItem';
import { useSelector } from 'react-redux';
import { postListSelector } from 'features/posts/postsSlice';
import styles from './PostList.module.css';

export default function PostList() {

  const posts = useSelector(postListSelector);

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
