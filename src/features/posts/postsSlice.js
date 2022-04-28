import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async ({ limit }, { dispatch, getState }) => {
    // const { todos } = getState()
    // console.log({ todos })
    // you can dispatch any action from here!
    // dispatch(del(2))
    return fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
    ).then((res) => res.json())
  }
)
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: null,
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload
      state.status = 'success'
    },
    [getPosts.rejected]: (state, action) => {
      state.status = 'failed'
    },
  },
})

export const selectPosts = ({ posts }) => posts

export default postsSlice.reducer