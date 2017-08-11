const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const bitMapFn = require('./bitMap.js');
const makeRequest = require('./makeRequest.js');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.post('/rgb', (req, res) => {
  bitMapFn([+req.body.n, +req.body.m])
    .then(data => {
      res.send(formatColorData(data));
    });
});

app.listen(3000, () => {
  console.log("Server listening on PORT 3000");
});


function formatColorData(data) {
  return data.reduce((p, v) => {
    p.push(...v);
    return p;
  }, [])
}