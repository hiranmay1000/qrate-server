const express = require('express');
const morgan = require('morgan');

const middleware = express();

middleware.use(express.json());
middleware.use(morgan("common"));

module.exports = middleware;