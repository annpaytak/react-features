import React, { useState, memo, useEffect } from "react";

// const Autocomplete = memo(({ options, onCompleted }) => {
//     const [value, setValue] = useState("");

//     return (
//       <fieldset>
//         <p>
//           <input
//             type="text"
//             value={value}
//             onChange={(e) => {
//               setValue(e.target.value);
//             }}
//           />
//         </p>

//         <ul>
//           {options
//             .filter((option) => option.includes(value))
//             .map((option, i) => (
//               <li key={i}>{option}</li>
//             ))}
//         </ul>
//       </fieldset>
//     );
//   });

// PureComponent shallow props <-> nextProps or state <-> nextState (wrap parent)
// shallow compare is a comparison between every key at the first level in the objects
// shouldComponentUpdate - for deep compare
// if it renders a lot of unnecessary times

// React.memo() shallow props <-> nextProps (wrap child) (dont work with useState, useReducer or useContext)
// React.memo(Component, areEqual) should return true if the component doesn’t have to be updated, false if it does.

const Autocomplete = memo(({ options, onCompleted }) => {
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const filteredOpts = options.filter((option) => option.includes(value));
    setFiltered(filteredOpts);
  }, [value, options]);

  useEffect(() => {
    if (filtered.length && filtered.includes(value)) {
      onCompleted(value);
    }
  }, [filtered]);

  return (
    <fieldset>
      <p>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </p>

      <ul>
        {filtered.map((option, i) => (
          <li key={i}>{option}</li>
        ))}
      </ul>
    </fieldset>
  );
});

export function App() {
  const [options, setOptions] = useState(["abc", "cde"]);
  const [completedValue, setCompletedValue] = useState("");

  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <h1>Hello Autocomplete</h1>

      <Autocomplete
        options={options}
        onCompleted={(value) => {
          setCompletedValue(value);
          console.log("onCompleted:", value);
        }}
      />

      <p>Completed: {completedValue}</p>

      <p>
        <button
          type="button"
          onClick={() => {
            setOptions([...options, "123"]);
          }}
        >
          Add New Option
        </button>
      </p>
    </div>
  );
}
