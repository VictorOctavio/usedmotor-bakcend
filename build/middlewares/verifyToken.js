"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.verifyModerador = exports.verifyAdmin = exports.getToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
    var token, token_validate;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.header('auth-token');

            if (token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              err: true,
              message: 'no existe token en cabezera'
            }));

          case 3:
            _context.prev = 3;
            //Validamos token
            token_validate = _jsonwebtoken.default.verify(token, process.env.SECRET);
            req.user = token_validate;
            next();
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", res.json({
              err: true,
              message: _context.t0.message
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 9]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var getToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res, next) {
    var token, token_validate;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = req.header('auth-token');

            if (token) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", next());

          case 3:
            try {
              //Validamos token
              token_validate = _jsonwebtoken.default.verify(token, process.env.SECRET);
              req.user = token_validate;
              next();
            } catch (err) {
              res.json({
                err: true,
                message: err.message
              });
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getToken(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getToken = getToken;

var verifyModerador = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res, next) {
    var user, roles, i;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _User.default.findOne({
              _id: req.user.id
            });

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.json({
              err: true,
              message: 'usuario no existe'
            }));

          case 6:
            _context3.next = 8;
            return _Role.default.find({
              _id: {
                $in: user.roles
              }
            });

          case 8:
            roles = _context3.sent;
            i = 0;

          case 10:
            if (!(i < roles.length)) {
              _context3.next = 16;
              break;
            }

            if (!(roles[i].name === ('moderator' || 'admin'))) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", next());

          case 13:
            i++;
            _context3.next = 10;
            break;

          case 16:
            return _context3.abrupt("return", res.json({
              err: true,
              message: 'No tienes permisos de moderador'
            }));

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.json({
              err: true,
              message: _context3.t0.message
            }));

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 19]]);
  }));

  return function verifyModerador(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.verifyModerador = verifyModerador;

var verifyAdmin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res, next) {
    var user, roles, i;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _User.default.findOne({
              _id: req.user.id
            });

          case 3:
            user = _context4.sent;

            if (user) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.json({
              err: true,
              message: 'usuario no existe'
            }));

          case 6:
            _context4.next = 8;
            return _Role.default.find({
              _id: {
                $in: user.roles
              }
            });

          case 8:
            roles = _context4.sent;
            i = 0;

          case 10:
            if (!(i < roles.length)) {
              _context4.next = 16;
              break;
            }

            if (!(roles[i].name === 'admin')) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt("return", next());

          case 13:
            i++;
            _context4.next = 10;
            break;

          case 16:
            return _context4.abrupt("return", res.json({
              err: true,
              message: 'No tienes permisos de moderador'
            }));

          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.json({
              err: true,
              message: _context4.t0.message
            }));

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 19]]);
  }));

  return function verifyAdmin(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.verifyAdmin = verifyAdmin;