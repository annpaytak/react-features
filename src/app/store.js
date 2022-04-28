import { configureStore } from '@reduxjs/toolkit'
import commentsReducer from '../features/comments/commentsSlice'
import postsReducer from '../features/posts/postsSlice'

export default configureStore({
  reducer: {
    comments: commentsReducer,
    posts: postsReducer
  },
})