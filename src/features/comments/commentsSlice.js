import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getComments = createAsyncThunk(
    'comments/getComments',
    async ({ id }, { dispatch, getState }) => {
      // const { todos } = getState()
      // console.log({ todos })
      // you can dispatch any action from here!
      // dispatch(del(2))
      return fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      ).then((res) => res.json())
    }
)
const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: null,
  },
  extraReducers: {
    [getComments.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getComments.fulfilled]: (state, { payload }) => {
      state.comments = payload
      state.status = 'success'
    },
    [getComments.rejected]: (state, action) => {
      state.status = 'failed'
    },
  }
})

export const selectComments = ({ comments }) => comments

export default commentsSlice.reducer