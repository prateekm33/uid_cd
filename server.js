const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flatten = require('lodash/flatten');
const flattenDeep = require('lodash/flattenDeep');


const bitMapFn = require('./bitMap.js');
const whiteNoiseFn = require('./whiteNoise.js');
const genRSAPair = require('./genRSAPair.js');
const makeRequest = require('./makeRequest.js');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.post('/rgb', (req, res) => {
  console.log("[LOG] Request for /rgb API");
  bitMapFn([+req.body.n, +req.body.m])
    .then(data => { res.send(flatten(data)); })
    .catch(e => {
      console.log("[ERROR] : ", e);
      res.status(404).end();
    })
});

app.post('/whiteNoise', (req, res) => {
  console.log("[LOG] Request for /whiteNoise API");
  whiteNoiseFn(req.body.audioSize, req.body.max)
    .then(data => res.send(flattenDeep(data)))
    .catch(e => {
      console.log("[ERROR] : ", e);
      res.status(404).end();
    });
});

app.post('/rsa', (req, res) => {
  res.send("Implementation is not yet completed");
  console.log("[LOG] Request for /rsa API");
  // The below functionality is not yet complete
  // genRSAPair().then(keyPair => res.send(keyPair))
  //   .catch(e => {
  //     console.log("[ERROR] : ", e);
  //     res.status(404).end();
  //   })
});

app.listen(3000, () => {
  console.log("Server listening on PORT 3000");
});