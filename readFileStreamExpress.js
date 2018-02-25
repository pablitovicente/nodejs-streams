const fs = require('fs');
const v8 = require('v8');
const express = require('express');
const app = express();
const streamConfig = {
  flags: 'r',
  autoClose: true,
  highWaterMark: 32 * 1024
};

app.get('/ping', (req, res) => {
  console.log('Got request to /ping');
  res.send(v8.getHeapStatistics())
});

app.get('/big', (req, res) => {
  const file = fs.createReadStream('2GB.txt', streamConfig);


  file.on('data', (chunk) => {
      //console.log(`Received ${chunk.length} bytes of data.`);
  });

  file.on('end', () => {
      res.send('Reading File Stream done!');
  });
});

app.get('/stream', (req, res) => {
  const file = fs.createReadStream('2GB.txt', streamConfig).pipe(res);
});

app.get('/block', (req, res) => {
  console.log('got request to /block');
  fs.readFile('2GB.txt', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))