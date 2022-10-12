//const http = require('http');

const express = require('express');

const app = express();

//use() method allow add middleware
app.use('/users', (req, res, next) => {
  console.log('In another middleware');
  res.send('<h1>Hello Users!</h1>');
  //next(); Allow the request to continue to the next middleware in line
});

app.use('/', (req, res, next) => {
  console.log('In a middleware');
  res.send('<h2>Nice to meet you!</h2>');
});

app.listen(3000);
