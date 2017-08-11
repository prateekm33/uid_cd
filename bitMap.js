const makeRequest = require('./makeRequest.js');

function rgbBitMap(dims) {
  const numDivs = dims[0] * dims[1];
  return makeRequest({
    size : numDivs,
    max : 255,
    col : 3
  });
}

module.exports = rgbBitMap;