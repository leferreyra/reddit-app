import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postByIdSelector } from 'features/posts/postsSlice';
import styles from './PostDetail.module.css';

export default function PostDetail() {

  const { selectedPostId } = useParams();
  const post = useSelector(state => postByIdSelector(state, selectedPostId));

  if (!selectedPostId) {
    return (
      <p>No post selected</p>
    )
  }

  if (!post) {
    return null;
  }

  return (
    <div className={styles.details}>
      {post.title}
    </div>
  );
}
