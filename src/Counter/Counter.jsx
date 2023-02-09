import React, { useState, useCallback, useRef } from "react";

function useThrottle(callback, cooldown) {
  // let lastArgs;
  const lastArgs = useRef();
  const timer = useRef();

  const throttledCallback = useCallback(
    (...args) => {
      const isOnCooldown = !!lastArgs.current;

      // Assignments to the 'lastArgs' variable from inside React Hook useCallback will be lost after each render.
      // To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property.
      // Otherwise, you can move this variable directly inside useCallback.
      lastArgs.current = args;

      if (isOnCooldown) {
        return;
      }

      timer.current = setTimeout(() => {
        if (lastArgs.current) {
          callback(...lastArgs.current);
          lastArgs.current = null;
        }
      }, cooldown);
    },
    [callback, cooldown]
  );

  // Execute the action initially (currently, it's delayed);
  // Cancel or flush the throttled function;
  throttledCallback.flush = () => {
    if (lastArgs.current) callback(...lastArgs.current);
    if (timer.current) clearTimeout(timer.current);
  };

  return throttledCallback;
}

export const Counter = () => {
  const [value, setValue] = useState(0);
  const [trottledValue, setTrottledValue] = useState(0);

  const throttledMouseMove = useThrottle(() => {
    setTrottledValue((prev) => prev + 1);
  }, 2000);

  const mouseMove = () => {
    setValue((prev) => prev + 1);
  };

  return (
    <div
      style={{
        minHeight: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#efecec",
      }}
      onMouseMove={() => {
        mouseMove();
        throttledMouseMove();
      }}
    >
      <p>regular {value}</p>
      <p>trottle (delay for 2 sec) {trottledValue}</p>
    </div>
  );
};
