const makeRequest = require('./makeRequest.js');

function whiteNoise(size, max) {
  return makeRequest({
    size,
    max,
    col : 1
  });
}

module.exports = whiteNoise;