import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getTopPosts } from 'api/RedditApi';

export const fetchTopPosts = createAsyncThunk(
  'posts/fetchTopPosts',
  async thunkApi => {
    const posts = await getTopPosts();
    return posts;
  }
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: {},
    itemsState: {},
    list: []
  },
  reducers: {
    select: (state, action) => {
      const itemState = state.itemsState[action.payload];
      if (itemState) {
        itemState.read = true;
      } else {
        state.itemsState[action.payload] = { read: true };
      }
    },
    dismiss: (state, action) => {
      const itemState = state.itemsState[action.payload];
      if (itemState) {
        itemState.dismissed = true;
      } else {
        state.itemsState[action.payload] = { dismissed: true };
      }
    },
    restoreItemsState: (state, action) => {
      state.itemsState = action.payload;
    }
  },
  extraReducers: {
    [fetchTopPosts.fulfilled]: (state, action) => {
      const { payload } = action;
      payload.data.children.forEach(post => {
        const { data: { id } } = post;
        state.items[id] = post.data;
        state.list.push(id);
      })
    }
  }
});

export const { select, dismiss, restoreItemsState } = postsSlice.actions;

export const postByIdSelector =  createSelector(
  state => state.posts.items,
  (_, postId) => postId,
  (items, postId) => items[postId]
)

export const postReadByIdSelector =  createSelector(
  state => state.posts.itemsState,
  (_, postId) => postId,
  (states, postId) => states[postId] ? states[postId].read : false
)

export default postsSlice.reducer;
