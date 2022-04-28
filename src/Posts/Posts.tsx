import React, {useEffect, useState, useCallback} from 'react';

type Post = {
  userId: number,
  id: number,
  title: string,
  body: string
}

type PostsResult = {
  data: Array<Post>,
  error: boolean,
  loading: boolean,
  refetch: () => Promise<void>
}

type Comment = {
  id: number,
  body: string,
  postId: number,
  name: string,
  email: string
}

type CommentsResult = {
  data: Array<Comment>,
  error: boolean,
  loading: boolean,
  refetch: () => Promise<void>
}

const POSTS_API_URL = "https://jsonplaceholder.typicode.com/posts";
const postsAmount = 5;

const useFetchData = <T extends unknown>(fetchFn: () => Promise<T>) => {
  const [data, setData] = useState<any | null>([]); // <T>
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    return fetchFn()
      .then(setData, setError)
      .finally(() => setLoading(false));
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {data, error, loading, refetch: fetchData};
};

const fetchPosts = () =>
  fetch(`${POSTS_API_URL}?_limit=${postsAmount}`).then(res => res.json());

const usePosts = ():PostsResult => useFetchData(fetchPosts);

const fetchComments = (id: number) =>
  fetch(`${POSTS_API_URL}/${id}/comments`).then(res => res.json());

const useComments = (id: number):CommentsResult => useFetchData(useCallback(() => {
  return fetchComments(id);
}, [id]));

export const Posts = () => {
  const [id, setId] = useState(1);
  const [showComments, setShowComments] = useState(false);

  const {data: posts} = usePosts();
  const {data: comments} = useComments(id);

  useEffect(() => {
    setShowComments(false);
  }, [id])

  return (
    <div>
      <div style={{display: 'flex'}}>{posts.map(({id}) =>
        <div key={id}
          onMouseEnter={() => setId(id)}
          onClick={() => setShowComments(!showComments)}
          style={{width: 200, height: 200, backgroundColor: '#efecec', margin: 4}}>
          <span>post</span>
          <span>[{id}]</span>
        </div>
      )}</div>

      <div>{showComments && comments.map((comment, index) => (
        <div key={comment.id}
        style={{
          width: 'fit-content',
          margin: 2,
          padding: '0.5rem 1.5rem 0.5rem 1rem',
          backgroundColor: '#eeffde',
          borderRadius: '50px'
        }}>{++index} comment for post [{comment.postId}]</div>
      ))}</div>
    </div>
  );
};