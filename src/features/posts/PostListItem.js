import React, { useMemo } from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { postByIdSelector, postReadByIdSelector } from 'features/posts/postsSlice';
import styles from './PostListItem.module.css';

const makePostByIdSelector = () => postByIdSelector;
const makePostReadByIdSelector = () => postReadByIdSelector;

export default function PostListItem({ postId }) {

  const selectPostById = useMemo(
    makePostByIdSelector,
    []
  );

  const selectPostStateById = useMemo(
    makePostReadByIdSelector,
    []
  );

  const post = useSelector(state => selectPostById(state, postId));
  const read = useSelector(state => selectPostStateById(state, postId));

  const history = useHistory();
  const { selectedPostId } = useParams();

  const classNames = cx(styles.post, {
    [styles.selected]: selectedPostId === post.id,
    [styles.read]: read,
  });

  return (
    <div className={classNames} onClick={() => history.push(`/${post.id}`)}>
      {post.title}
    </div>
  );
}
