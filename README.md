# Prose/Promise

Copyright (c) 2019 Seán D. Murray
SEE MIT LICENSE FILE

A promise utility. Make writing node easier, prettier and less error prone. Writes and reads more like prose.

## Synopsis

sequence: Run a bunch of promises in sequence with the option of stopping based on the results of a previous promise.

## Usage

```javascript
// Example using the sequence method to run promises in sequence.
const promise_util = require('prose_promise');

// The optionalStopFunction is called before each function-wrappred-promise is called.
// if returns true... processing stops.
let optionalStopFunction = (data) => {
  //return true; // will stop the next promise from running and end the sequence
  return false; // the sequence will continue
};

// 1st function-wrapped-promimse does not get any data.
// Each promise in the sequence must be wrapped in a function.
const functionWrappedPromiseOne = () => {
  return new Promise((resolve) => {
    console.log('1st promise.');
    return resolve({ data: 'Print me in 2nd promise'});
  });
};

// Every promise after the 1st is passed one argument.
// Each promise (other than the 1st) will be passed a data object
const functionWrappedPromiseTwo= (data) => {
  return new Promise((resolve) => {
    console.log(data.data);
    return resolve();
  });
};

promise_util.sequence([ functionWrappedPromiseOne, functionWrappedPromiseTwo], optionalStopFunction).then(() => {
	console.log('Promises sequence complete.');
}).catch((err) => console.log(err));

```
