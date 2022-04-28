import React from 'react';
import { useSelector } from 'react-redux'
import { selectComments } from './commentsSlice'

export const Comments = () => {
  const { comments } = useSelector(selectComments)
  return (
    <div>
      {comments && comments.map((comment, index) => (
        <div key={comment.id}>
          {++index} comment for post [{comment.postId}]
        </div>
      ))}
    </div>
  );
};
