const http = require('http');

let server = http.createServer();
server.listen(80, '127.0.0.1');
server.on('request', (req, res) => {
  let time = Date.now(),
      delta = Math.random() * 1000;
  while(Date.now() < time + delta);
  if (delta > 500) {
    abc();
    // throw new Error('error message');
  }
  res.end(`worker[${process.pid}] handle request`);
});

process.on('uncaughtException', (err) => {
  console.log(`error: ${err}`);
  process.send({act: 'suicide'});
  server.close(() => {
    process.exit(1);
  });
  setTimeout(() => {
    process.exit(1);
  }, 10000);
});