/*
** This file is not yet complete. It can find the prime #s to 
** multiply together, but the rest of the mathematics is not
** yet implemented.
*/

const makeRequest = require('./makeRequest');
const flatten = require('lodash/flatten');

let prime1, prime2;
/*
** Ideally the min and max here would be configured such that
** the requested integers are very large. However, since the 
** prime testing function used here is not the most efficient
** it would be best to opt to minimize the range for purposes
** of the demo. 
*/
function genRSAPair(size = 2) {
  return makeRequest({
    size,
    max : 100000,
    col : 1
  }).then(result => {
    const flattened = flatten(result);
    let size = 0;
    
    if (!isPrime(flattened[0])) size++;
    else prime1 = flattened[0];

    if (!isPrime(flattened[1])) size++;
    else prime2 = flattened[1];

    if (size === 0) {
      const p1 = prime1 || flattened[0];
      const p2 = prime2 || flattened[1];

      const pubKeyProd = p1 * p2;
      prime1 = prime2 = null;
      return pubKeyProd;

    }
    return genRSAPair(size);
  });
}

module.exports = genRSAPair;


function isPrime(n) {
  if(n < 1 || n % 1 !== 0) return false;

  const arr = primeSieve(2, n-1), i = 0;
  let prime = arr.shift();

  while (!!(n % prime)) {
    if (arr.length === 0) break;
    prime = arr.shift();
  }

  return !!(n % prime);
};

function primeSieve(start, end) {
  const primes = [];
  let val = start;

  while (val <= end) {
    let isPrime = true;
    for (let i = 2; i < val; i++) {
      if (!(val % i)) {
        isPrime = false;
        break;
      }
    }
    isPrime ? primes.push(val) : null;
    val++;
  }
  return primes;
};
