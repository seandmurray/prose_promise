const assert = require('assert');
const promise_util = require('../index');

let vone;
let vtwo;
let vthree;

let xone = 'one';
let xtwo = 'two';
let xthree = 'three';
let xstop = 'stop';

let stopit = (data) => {
  if (xstop === data) {
    return true;
  }
  return false;
};

let fone = () => {
  return new Promise((resolve) => {
    vone = xone;
    resolve(xtwo);
  });
};

let ftwo = (data) => {
  return new Promise((resolve) => {
    vtwo = data;
    resolve(xthree);
  });
};

let fthree = (data) => {
  return new Promise((resolve) => {
    vthree = data;
    resolve(true);
  });
};

let checkSettings = () => {
  return new Promise((resolve) => {
    console.log('Checking that all promises ran sequentially.');
    assert.equal(vone, xone, 'Make sure the 1st promise ran');
    assert.equal(vtwo, xtwo, 'Make sure the 2nd promise ran and it set the property passed from the 1st promise');
    assert.equal(vthree, xthree, 'Make sure the 3rd promise ran and it set the property passed from the 2nd promise');
    // If we use 'resolve' to exit this promise, the sequence will continue.
    // however if we use a return so long as the return is not a promise
    // the loop will continue.
    console.log('Promises ran sequentially.');
    resolve(xstop);
  });
};

const shouldNotRun = () => {
  throw new Error('This should not run!!!');
};

console.log('Run list of promises');
promise_util.sequence([fone, ftwo, fthree, checkSettings]).then(() => {
  console.log('List of promises tests complete.');
}).catch((err) => console.log(err));

console.log('Run promises with stop function');
promise_util.sequence([fone, ftwo, fthree, checkSettings, shouldNotRun], stopit).then(() => {
  console.log('Promises tests complete with a stop function.');
}).catch((err) => console.log(err));

console.log('Send empty array into sequence');
promise_util.sequence([]).then(() => {
  console.log('Promises tests complete with empty array.');
}).catch((err) => console.log(err));
