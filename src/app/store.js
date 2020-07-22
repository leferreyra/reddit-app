import postsReducer, { restoreItemsState } from '../features/posts/postsSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});


if ('localStorage' in window) {
  const itemsState = JSON.parse(localStorage.getItem('itemsState'));

  if (itemsState) {
    store.dispatch(restoreItemsState(itemsState));
  }

  store.subscribe(() => {
    const { itemsState } = store.getState().posts;
    localStorage.setItem('itemsState', JSON.stringify(itemsState));
  })
}

export default store;
