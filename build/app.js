"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _auto = _interopRequireDefault(require("./routes/auto.route"));

var _user = _interopRequireDefault(require("./routes/user.route"));

var _admin = _interopRequireDefault(require("./routes/admin.route"));

//Rutas
//Inicialization express
var app = (0, _express.default)(); //Config/Setting
//configurar cabeceras http

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, auth-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}); //Middlewares

app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.json());
app.use((0, _morgan.default)('dev')); //Rutas

app.use('/api', _auto.default);
app.use('/api', _user.default);
app.use('/api', _admin.default); //Export module

var _default = app;
exports.default = _default;