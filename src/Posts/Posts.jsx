import React, { useState, useCallback, useRef } from "react";
import "./posts.css";

const POSTS_API_URL = "https://jsonplaceholder.typicode.com/posts";

function useDebounce(callback, delay) {
  const timer = useRef(null);

  const debouncedCallback = useCallback(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  debouncedCallback.flush = (...args) => {
    clearTimeout(timer.current);
    callback(...args);
  };

  return debouncedCallback;
}

export const Posts = () => {
  const [value, setValue] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  const searchPostsByUserId = useDebounce((value) => {
    fetch(`${POSTS_API_URL}?userId=${value}`)
      .then((res) => res.json())
      .then(setPosts, setError);
  }, 2000);

  const changeHandler = useCallback(
    (event) => {
      setValue(event.target.value);

      const capitalizedQuery =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1);
      console.log(capitalizedQuery);
      searchPostsByUserId(capitalizedQuery);
    },
    [searchPostsByUserId]
  );

  return (
    <div className="main">
      <div>debounce delay for 2 sec</div>
      <div>try searching number 1, 2, 3 etc</div>
      <input
        type="number"
        value={value}
        onChange={changeHandler}
        style={{ width: 200 }}
      />
      <button
        onClick={() => {
          console.log(value);
          searchPostsByUserId.flush(value);
        }}
      >
        instant search
      </button>
      {!!posts.length &&
        posts.map(({ id, userId, title, body }) => (
          <div key={id} className="post">
            <p>
              userId
              {userId}
            </p>
            <p className="title">{title}</p>
            <p className="description">{body}</p>
          </div>
        ))}
    </div>
  );
};
