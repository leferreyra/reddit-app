import React, { useEffect } from 'react';
import TimeAgo from 'shared/TimeAgo';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postByIdSelector, select } from 'features/posts/postsSlice';
import { ReactComponent as CommentIcon } from 'images/comment.svg';
import styles from './PostDetail.module.css';

export default function PostDetail() {

  const dispatch = useDispatch();
  const { selectedPostId } = useParams();
  const post = useSelector(state => postByIdSelector(state, selectedPostId));
  const loading = useSelector(state => state.posts.loading);

  useEffect(() => {
    if (selectedPostId && post) {
      dispatch(select(selectedPostId));
    }
  }, [dispatch, post, selectedPostId])

  if (loading && selectedPostId && !post) {
    return (
      <p className={styles.message}>Loading...</p>
    )
  }

  if (!selectedPostId) {
    return (
      <p className={styles.message}>No post selected</p>
    )
  }

  if (!post) {
    return <p className={styles.message}>Post not found</p>;
  }

  return (
    <div className={styles.details}>
      <h1 className={styles.header}>
        {post.title}
      </h1>
      <p className={styles.authorAndTime}>
        posted by {post.author} <TimeAgo date={post.created} />
      </p>
      <div className={styles.comment}>
        <CommentIcon />
        {post.num_comments}
      </div>
      <img className={styles.image} src={post.thumbnail} alt="" />
    </div>
  );
}
