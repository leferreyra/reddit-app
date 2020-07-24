import React, { useMemo } from 'react';
import cx from 'classnames';
import TimeAgo from 'shared/TimeAgo';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { postByIdSelector, postReadByIdSelector, dismiss } from 'features/posts/postsSlice';
import { ReactComponent as CloseIcon } from 'images/close.svg';
import { ReactComponent as CommentIcon } from 'images/comment.svg';
import styles from './PostListItem.module.css';

const makePostByIdSelector = () => postByIdSelector;
const makePostReadByIdSelector = () => postReadByIdSelector;

export default function PostListItem({ postId }) {

  const dispatch = useDispatch();

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

  const onDismiss = event => {
    event.stopPropagation();
    dispatch(dismiss(post.id));
  }

  const classNames = cx(styles.post, {
    [styles.selected]: selectedPostId === post.id,
    [styles.read]: read,
  });
  
  return (
    <div className={classNames} onClick={() => history.push(`/${post.id}`)}>
      <div className={styles.header}>
        <span>{post.author} posted</span>
        <TimeAgo date={post.created} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>
          {post.title}
        </h3>
        <img className={styles.thumbnail} src={post.thumbnail} alt="" />
      </div>
      <div className={styles.footer}>
        <div className={styles.comment}>
          <CommentIcon />
          {post.num_comments}
        </div>
        <button className={styles.dismissButton} onClick={onDismiss}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
