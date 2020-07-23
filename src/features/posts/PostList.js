import React from 'react';
import PostListItem from 'features/posts/PostListItem';
import { useSelector } from 'react-redux';
import { postListSelector } from 'features/posts/postsSlice';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styles from './PostList.module.css';

export default function PostList() {

  const posts = useSelector(postListSelector);

  return (
    <div className={styles.list}>
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
      </TransitionGroup>
    </div>
  );
}
