import React, { useEffect, useRef } from 'react';
import PostListItem from 'features/posts/PostListItem';
import { useDebouncedCallback } from 'use-debounce';
import { useSelector } from 'react-redux';
import { postListSelector, fetchTopPosts } from 'features/posts/postsSlice';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useDispatch } from 'react-redux';
import { ReactComponent as Skeleton } from 'images/skeleton.svg';
import styles from './PostList.module.css';

const SCROLL_OFFSET = 2000;

export default function PostList() {

  const listRef = useRef(null);
  const dispatch = useDispatch();
  const posts = useSelector(postListSelector);
  const loading = useSelector(state => state.posts.loading);

  useEffect(() => {
    if (!loading && posts.length < 20) {
      dispatch(fetchTopPosts());
    }
  }, [dispatch, loading, posts])

  const [onScroll] = useDebouncedCallback(() => {
    if (!loading && listRef.current) {
      const { current: { clientHeight, scrollHeight, scrollTop } } = listRef;
      const bottom = scrollHeight - scrollTop - clientHeight;
      if (bottom < SCROLL_OFFSET) {
        dispatch(fetchTopPosts());
      }
    }
  }, 50);

  return (
    <div className={styles.list} ref={listRef} onScroll={onScroll}>
      <TransitionGroup
        appear={false}
        enter={false}>
        {posts.map(postId => (
          <CSSTransition
            key={postId}
            timeout={300}
            classNames={{
              exit: styles.exit,
              exitActive: styles.exitActive,
              exitDone: styles.exitDone,
            }}>
            <div className={styles.post}>
              <PostListItem postId={postId} />
            </div>
          </CSSTransition>
        ))}
        <div className={styles.post}>
          <Skeleton className={styles.loading} />
        </div>
        <div className={styles.post}>
          <Skeleton className={styles.loading} />
        </div>
        <div className={styles.post}>
          <Skeleton className={styles.loading} />
        </div>
      </TransitionGroup>
    </div>
  );
}
