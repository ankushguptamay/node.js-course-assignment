const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  //console.log(req);
  const url = req.url;
  const method = req.method;
  if(url==='/'){
    res.setHeader('content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter massage</title></head>');
    res.write('<body><form action="/massage" method="POST"><input type="text" name="massage"><button type="submit">send</button></form></body>');
    res.write('</html>');
    return res.end();
  }

  if(url==='/massage' && method==='POST'){
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const massage = parseBody.split('=')[1];
      fs.writeFile('massage.txt', massage, (err) => {
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
      });
    })
  }

  res.setHeader('content-type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My first node</title></head>');
  res.write('<body><h1>Hello to my node.js server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);