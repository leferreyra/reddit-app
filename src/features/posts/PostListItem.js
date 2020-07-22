import React, { useMemo } from 'react';
import cx from 'classnames';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styles from './PostListItem.module.css';

const makePostByIdSelector = () =>
  createSelector(
    state => state.posts.items,
    (_, postId) => postId,
    (items, postId) => items[postId]
  )

export default function PostListItem({ postId }) {

  const selectPostById = useMemo(
    makePostByIdSelector,
    []
  );

  const post = useSelector(state => selectPostById(state, postId));
  const history = useHistory();
  const { selectedPostId } = useParams();

  const classNames = cx(styles.post, {
    [styles.selected]: selectedPostId === post.id,
  });

  return (
    <div className={classNames} onClick={() => history.push(`/${post.id}`)}>
      {post.title}
    </div>
  );
}
