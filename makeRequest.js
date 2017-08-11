const request = require('request');
const baseUri = 'https://www.random.org/integers/';

function makeRequest(options) {
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
