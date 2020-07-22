import React, { useMemo } from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { postByIdSelector } from 'features/posts/postsSlice';
import styles from './PostListItem.module.css';

const makePostByIdSelector = () => postByIdSelector;

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
