# debounce hook with react

### what's done

throttle function when you care about some intermediate values of a frequently executed expensive action, but it's ok to discard most of them

use case: optimize the resize and scroll handlers

Throttling limits the rate of execution, is similar to debounce, except it guarantees the regular execution of an action. Calls callback every X milliseconds.

Created a throttle function that accepts a callback and the cooldown duration arguments.
The throttle function returns a new function, which when executed, stores the call arguments and starts the cooldown timer.
When the timer finishes, execute the action with the cached arguments and clear them.

### tools

`react`
