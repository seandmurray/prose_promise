# Prose/Promise

Make writing node easier, prettier and less error prone. Writes and reads more like prose

A utility to help manipulate promises.

See also prose_isit.

## Usage

```javascript
const promise_util = require('../index');

let optionalStopFunction = (data) => {
  return true; // will stop the next promise from running and end the sequence
  return false; // the sequence will continue
};

// Each promise in the sequence must be wrapped in a function.
const functionWrappedPromiseOne = () => {
  return new Promise((resolve) => {
    vone = xone;
    resolve(xtwo);
  });
};

// Each promise (other than the 1st) will be passed a data object
const functionWrappedPromiseTwo= (data) => {
  return new Promise((resolve) => {
    vtwo = data;
    resolve(xthree);
  });
};

promise_util.sequence([ functionWrappedPromiseOne, functionWrappedPromiseTwo], optionalStopFunction).then(() => {
	console.log('Promises sequence complete.');
}).catch((err) => console.log(err));

```
