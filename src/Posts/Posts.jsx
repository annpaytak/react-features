import React, {useEffect, useState, useCallback} from 'react';

const POSTS_API_URL = "https://jsonplaceholder.typicode.com/posts";
const postsAmount = 5;

const useFetchData = (fetchFn) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchFnCallback = useCallback(() => {
    return fetchFn()
      .then(setData, setError)
      .finally(() => setLoading(false));
  }, [fetchFn]);

  useEffect(() => {
    fetchFnCallback();
  }, [fetchFnCallback]);

  console.log(data);
  return {data, error, loading, refetch: fetchFnCallback};
};

const fetchPosts = () =>
  fetch(`${POSTS_API_URL}?_limit=${postsAmount}`).then(res => res.json());

const usePosts = () => useFetchData(fetchPosts);


const fetchComments = (id) =>
  fetch(`${POSTS_API_URL}/${id}/comments`).then(res => res.json());

const useComments = (id) => useFetchData(useCallback(() => {
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

      <div>{showComments && comments.map((comment, index) => <div key={comment.id}>{++index} comment for post [{comment.postId}]</div>)}</div>
    </div>
  );
};