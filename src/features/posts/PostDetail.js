import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postByIdSelector, select } from 'features/posts/postsSlice';
import styles from './PostDetail.module.css';

export default function PostDetail() {

  const dispatch = useDispatch();
  const { selectedPostId } = useParams();
  const post = useSelector(state => postByIdSelector(state, selectedPostId));

  useEffect(() => {
    if (selectedPostId && post) {
      dispatch(select(selectedPostId));
    }
  }, [dispatch, post, selectedPostId])

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
