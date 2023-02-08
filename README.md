# debounce hook with react

### what's done

do not call fetch on each input typing, instead fetch data only after user finished typing

Created a function that accepts a function to debounce and the timeout delay as arguments.
The debounce function returns a new function. When it's executed, it creates a timer to execute the original function after the delay and cancels the previous timer.

Attached an extra method to the original debounce function implementation, that runs the pending action instantly and clears the timer.

### tools

`react`
