const flatten = require('lodash/flatten');
const makeRequest = require('./makeRequest.js');

function rgbBitMap(dims) {
  const numDivs = dims[0] * dims[1];
  let numsToRequest = numDivs * 3;
  const numRequestToMake = Math.floor(numsToRequest / 10000) + 1;

  const promises = [];
  while (numsToRequest) {
    let requesting = numsToRequest < 10000 ? numsToRequest : 10000;
    numsToRequest -= requesting;
    let options = {
      num : requesting,
      min : 0,
      max : 255,
      col : 3,
      base : 10,
      format : 'plain',
      rnd : 'new'
    }
    promises.push(makeRequest(options));
  }

  return Promise.all(promises, result => {
    return flatten(result);
  });
}

module.exports = rgbBitMap;