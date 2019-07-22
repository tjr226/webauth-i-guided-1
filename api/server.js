const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

const usersRouter = require('../users/users-router.js');
server.use('/api/users', usersRouter);

const authRouter = require('../auth/auth-router.js');
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});




module.exports = server;