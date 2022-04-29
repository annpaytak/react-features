import React, {useState, useCallback, useRef} from 'react';

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

function useDebounce(callback, delay) {
  const timer = useRef(null);

  const debouncedCallback = useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debouncedCallback;
};

export const Users = () => {
  const [value, setValue] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  const searchUser = useDebounce((value) => {
    fetch(`${USERS_API_URL}?username=${value}`)
      .then(res => res.json())
      .then(setUsers, setError);
  }, 500);

  const changeHandler = useCallback((event) => {
    const capitalizedQuery = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
    setValue(event.target.value);
    searchUser(capitalizedQuery);
  }, []);

  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <input
          type="text"
          value={value}
          onChange={changeHandler}
          style={{width: 200}} />
          {!!users.length && users.map((user) =>
            <div key={user.id}
              style={{width: 200, height: 200, backgroundColor: '#efecec', margin: 4}}>
              <div>user</div>
              <div>[{user.id}]</div>
              <div>{user.username}</div>
            </div>
          )}
      </div>
    </div>
  );
};