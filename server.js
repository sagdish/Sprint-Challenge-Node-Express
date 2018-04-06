const express = require('express');

const actionRoutes = require('./actionRoutes/actionRoutes.js');
const projectRoutes = require('./projectRoutes/projectRoutes.js');

const server = express();

function logger(req, res, next) {
  console.log('body: ', req.body);
  
  next();
}

server.use(express.json());
server.use(logger);

// routers:
server.use('/api/actions', actionRoutes);
server.use('/api/projects', projectRoutes);

const port = 5000;
server.listen(port, () => console.log('server is runnign on port 5000'));
