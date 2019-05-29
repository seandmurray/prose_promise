/* jshint esversion: 6 */
// Copyright (c) 2019 Seán D. Murray
// SEE MIT LICENSE FILE
const isit = require('prose_isit');

exports.sequence = function (functionWrappedPromises, stopFunctionOptional) {
  if (isit.notArray(functionWrappedPromises)) {
    throw new Error('The 1st argument is required and it is expected to be an array of function wrapped promises!');
  }
  if (functionWrappedPromises.length < 1) {
    return Promise.resolve();
  }
  let previous = Promise.resolve();
  for (let i = 0; i < functionWrappedPromises.length; i++) {
    let next = functionWrappedPromises[i];
    previous = previous.then((data) => {
      if (isit.aFunction(stopFunctionOptional) && stopFunctionOptional(data)) {
        i = functionWrappedPromises.length;
        return Promise.resolve();
      } else if (isit.aFunction(next)) {
        return next(data);
      }
    });
  }
  return previous;
};
