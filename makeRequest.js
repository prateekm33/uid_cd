const request = require('request');
const baseUri = 'https://www.random.org/integers/';

function makeRequest({ size, max, col }) {
  let numsToRequest = size * 3;
  const numRequestToMake = Math.floor(numsToRequest / 10000) + 1;

  const promises = [];
  while (numsToRequest) {
    let requesting = numsToRequest < 10000 ? numsToRequest : 10000;
    numsToRequest -= requesting;
    let options = {
      num : requesting,
      min : 0,
      max,
      col,
      base : 10,
      format : 'plain',
      rnd : 'new'
    }
    promises.push(requestHelper(options));
  }

  return Promise.all(promises, result => result);
}


function requestHelper(options) {
  const qps = parseOptionsToQPs(options);
  return new Promise((resolve, reject) => {
    request.get(`${baseUri}?${qps}`, (e, r, b) => {
      if (e) return reject(e);

      const data = b.split('\n').slice(0,-1);
      const rgbForDivs = data.map(line => line.split('\t'));
      resolve(rgbForDivs);
    });
  });
}

module.exports = makeRequest;

function parseOptionsToQPs(opt) {
  let qp = '';
  for (let o in opt) {
    qp += `${o}=${opt[o]}&`;
  }
  return qp.slice(0,-1);
}
