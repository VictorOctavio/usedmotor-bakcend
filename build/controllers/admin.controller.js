"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMailUsers = exports.getUsers = exports.deletePublicacion = exports.bloquearUser = exports.asignarRoles = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _Auto = _interopRequireDefault(require("../models/Auto"));

var _nodemailer = _interopRequireDefault(require("../lib/nodemailer"));

// ACCION BLOCK USER 
var bloquearUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var user, bloquedUser, message;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User.default.findOne({
              _id: req.params.id
            });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.json({
              err: true,
              message: 'No se ha encontrado usuario con ese id'
            }));

          case 6:
            _context.next = 8;
            return _User.default.findOneAndUpdate({
              _id: user.id
            }, {
              bloqued: !user.bloqued
            }, {
              new: true
            });

          case 8:
            bloquedUser = _context.sent;

            if (bloquedUser) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.json({
              err: true,
              message: 'No se ah podido bloqued'
            }));

          case 11:
            if (user.bloqued) message = 'Usuario ha sido desbloqueado';else message = 'Usuario ha sido bloqueado';
            return _context.abrupt("return", res.json({
              err: null,
              message: message,
              data: bloquedUser
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.json({
              err: true,
              message: _context.t0.message
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function bloquearUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //ELIMINAR PUBLICACION


exports.bloquearUser = bloquearUser;

var deletePublicacion = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var publicacion;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Auto.default.findOneAndRemove({
              _id: req.params.id
            });

          case 3:
            publicacion = _context2.sent;

            if (publicacion) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.json({
              err: true,
              message: 'No se ha podido eliminar actualizar'
            }));

          case 6:
            return _context2.abrupt("return", res.json({
              err: null,
              message: "".concat(publicacion.titulo, " se ha eliminado con exito!")
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.json({
              err: true,
              message: _context2.t0.message
            }));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function deletePublicacion(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //Asignar roles


exports.deletePublicacion = deletePublicacion;

var asignarRoles = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var id, _req$body, rol, accion, rolesFound, user, update;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            _req$body = req.body, rol = _req$body.rol, accion = _req$body.accion;
            _context3.next = 5;
            return _Role.default.findOne({
              name: rol
            });

          case 5:
            rolesFound = _context3.sent;

            if (rolesFound) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.json({
              err: true,
              message: 'roles no existentes'
            }));

          case 8:
            _context3.next = 10;
            return _User.default.findOne({
              _id: id
            });

          case 10:
            user = _context3.sent;

            if (user) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", res.json({
              err: true,
              message: 'usuario no encontrado con ese id'
            }));

          case 13:
            // //Asignar o quitar
            if (accion === 'add') user.roles = user.roles.push(rolesFound._id);else user.roles = user.roles.filter(function (role) {
              return role.toString() !== rolesFound._id.toString();
            });
            _context3.next = 16;
            return _User.default.findOneAndUpdate({
              _id: id
            }, user, {
              new: true
            });

          case 16:
            update = _context3.sent;

            if (update) {
              _context3.next = 19;
              break;
            }

            return _context3.abrupt("return", res.json({
              err: true,
              message: 'no se ha podido asiganar roles al usuario'
            }));

          case 19:
            return _context3.abrupt("return", res.json({
              err: null,
              message: 'Roles asignado',
              data: update
            }));

          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.json({
              err: true,
              message: _context3.t0.message
            }));

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 22]]);
  }));

  return function asignarRoles(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //Send message user


exports.asignarRoles = asignarRoles;

var sendMailUsers = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res) {
    var _req$body2, message, destino, users;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            // message = {url: "", titulo: "", texto: ""}
            _req$body2 = req.body, message = _req$body2.message, destino = _req$body2.destino;
            users = [];

            if (!(destino === 'subs')) {
              _context4.next = 7;
              break;
            }

            console.log('subs');
            _context4.next = 10;
            break;

          case 7:
            _context4.next = 9;
            return _User.default.find({
              confirmMail: true
            });

          case 9:
            users = _context4.sent;

          case 10:
            users.map(function (user) {
              return (0, _nodemailer.default)(destino, null, user, message);
            });
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.json({
              err: true,
              message: _context4.t0.message
            }));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 13]]);
  }));

  return function sendMailUsers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //Get usuarios


exports.sendMailUsers = sendMailUsers;

var getUsers = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(req, res) {
    var _req$query, _req$query$limit, limit, _req$query$page, page, _req$query$sort, sort, users;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$query = req.query, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 30 : _req$query$limit, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$sort = _req$query.sort, sort = _req$query$sort === void 0 ? '-createdAt' : _req$query$sort;
            users = _User.default.paginate({}, {
              limit: limit,
              page: page,
              sort: sort
            });
            return _context5.abrupt("return", res.json({
              err: null,
              data: users
            }));

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.json({
              err: true,
              message: _context5.t0.message
            }));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 6]]);
  }));

  return function getUsers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;