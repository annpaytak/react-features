import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, selectPosts } from './postsSlice'
import { getComments } from '../comments/commentsSlice'

export const Posts = () => {
  const [id, setId] = useState(1);
  const { posts } = useSelector(selectPosts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getComments({ id: id }))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(getPosts({ limit: 5 }))
  }, [dispatch])

  return (
    <div style={{display: 'flex'}}>
      {posts && posts.map(({id}) =>
        <div key={id} onClick={() => setId(id)}
          style={{width: 200, height: 200, backgroundColor: '#efecec', margin: 4}}>
          <span>post</span>
          <span>[{id}]</span>
        </div>
      )}
    </div>
  );
};