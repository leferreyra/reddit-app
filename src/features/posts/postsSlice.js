import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTopPosts } from 'api/RedditApi';

export const fetchTopPosts = createAsyncThunk(
  'posts/fetchTopPosts',
  async thunkApi => {
    const response = await getTopPosts();
    return response;
  }
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: {},
    topList: []
  },
  reducers: {},
  extraReducers: {
    [fetchTopPosts.fulfilled]: (state, action) => {
      state.topList.push(action.payload);
    }
  }
});

export default postsSlice.reducer;
