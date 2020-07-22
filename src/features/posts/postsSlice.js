import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
    list: []
  },
  reducers: {},
  extraReducers: {
    [fetchTopPosts.fulfilled]: (state, action) => {
      const { payload } = action;
      payload.data.children.forEach(post => {
        state.items[post.data.id] = post.data;
        state.list.push(post.data.id);
      })
    }
  }
});

export default postsSlice.reducer;
