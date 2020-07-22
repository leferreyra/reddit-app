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
    posts: {},
    top: []
  },
  reducers: {},
  extraReducers: {
    [fetchTopPosts.fulfilled]: (state, action) => {
      const { payload } = action;
      payload.data.children.forEach(post => {
        state.posts[post.data.id] = post.data;
        state.top.push(post.data.id);
      })
    }
  }
});

export default postsSlice.reducer;
