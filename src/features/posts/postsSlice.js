import last from 'lodash.last';
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getTopPosts } from 'api/RedditApi';

export const fetchTopPosts = createAsyncThunk(
  'posts/fetchTopPosts',
  async (_, { getState }) => {
    const { list } = getState().posts;
    const lastItemId = list.length ? last(list) : undefined;
    const posts = await getTopPosts(lastItemId);
    return posts;
  }
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
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
    dismissAll: (state, action) => {
      state.list.forEach(postId => {
        const postState = state.itemsState[postId];
        if (postState) {
          postState.dismissed = true;
        } else {
          state.itemsState[postId] = { dismissed: true };
        }
      })
    },
    restoreItemsState: (state, action) => {
      state.itemsState = action.payload;
    }
  },
  extraReducers: {
    [fetchTopPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTopPosts.fulfilled]: (state, action) => {
      const { payload } = action;
      state.loading = false;
      payload.data.children.forEach(post => {
        const { data: { id } } = post;
        state.items[id] = post.data;
        state.list.push(id);
      })
    }
  }
});

export const { select, dismiss, dismissAll, restoreItemsState } = postsSlice.actions;

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

export const postListSelector = createSelector(
  state => state.posts.list,
  state => state.posts.itemsState,
  (list, itemsStates) => {
    return list.filter(postId => !itemsStates[postId] || !itemsStates[postId].dismissed);
  }
)

export default postsSlice.reducer;
