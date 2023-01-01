"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PORT = exports.MONGODB_URI = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/failed';
exports.MONGODB_URI = MONGODB_URI;
var PORT = 8000 || 8080;
exports.PORT = PORT;