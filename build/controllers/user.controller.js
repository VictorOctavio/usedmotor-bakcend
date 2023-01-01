"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = exports.validarEmail = exports.updatePublicacionesUser = exports.updateGuardadosUser = exports.updateDataUser = exports.updateAvatarUser = exports.recuperarClave = exports.loginUser = exports.getPublicacionesUser = exports.deletePublicacionesUser = exports.createUser = exports.confrimRecuperarClave = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _Auto = _interopRequireDefault(require("../models/Auto"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _nodemailer = _interopRequireDefault(require("../lib/nodemailer"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

//Create new user
var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var _req$body, email, nombre, password, roles, validateEmail, user, foundRoles, role, new_user, token;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, email = _req$body.email, nombre = _req$body.nombre, password = _req$body.password, roles = _req$body.roles;
            _context.next = 4;
            return _User.default.findOne({
              email: email
            });

          case 4:
            validateEmail = _context.sent;

            if (!validateEmail) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.json({
              err: true,
              message: 'Email ya registrado'
            }));

          case 7:
            _context.t0 = _User.default;
            _context.t1 = email;
            _context.t2 = nombre;
            _context.next = 12;
            return _User.default.encryptPassword(password);

          case 12:
            _context.t3 = _context.sent;
            _context.t4 = {
              email: _context.t1,
              nombre: _context.t2,
              password: _context.t3
            };
            user = new _context.t0(_context.t4);

            if (!roles) {
              _context.next = 24;
              break;
            }

            _context.next = 18;
            return _Role.default.find({
              name: {
                $in: roles
              }
            });

          case 18:
            foundRoles = _context.sent;

            if (!(foundRoles.length <= 0)) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", res.json({
              err: true,
              message: 'roles no existente'
            }));

          case 21:
            user.roles = foundRoles.map(function (rol) {
              return rol._id;
            });
            _context.next = 28;
            break;

          case 24:
            _context.next = 26;
            return _Role.default.findOne({
              name: "user"
            });

          case 26:
            role = _context.sent;
            user.roles = [role._id];

          case 28:
            _context.next = 30;
            return user.save();

          case 30:
            new_user = _context.sent;

            if (new_user) {
              _context.next = 33;
              break;
            }

            return _context.abrupt("return", res.json({
              err: true,
              message: 'error al intentar guarda usuario'
            }));

          case 33:
            //Crate token y send email
            token = _jsonwebtoken.default.sign({
              id: new_user._id
            }, process.env.SECRET);
            _context.next = 36;
            return (0, _nodemailer.default)('confirm', token, email);

          case 36:
            return _context.abrupt("return", res.header('auth-token', token).json({
              err: null,
              message: "Hola, ".concat(new_user.nombre, " te hemos enviado un email para validar tu cuenta"),
              data: user,
              token: token
            }));

          case 39:
            _context.prev = 39;
            _context.t5 = _context["catch"](0);
            return _context.abrupt("return", res.json({
              err: true,
              message: _context.t5.message
            }));

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 39]]);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //VERIFICATION USER


exports.createUser = createUser;

var validarEmail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var updateUser;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User.default.findOneAndUpdate({
              _id: req.user.id
            }, {
              confirmMail: true
            });

          case 3:
            updateUser = _context2.sent;

            if (updateUser) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.json({
              err: true,
              message: "Error de Validaci\xF3"
            }));

          case 6:
            return _context2.abrupt("return", res.json({
              err: null,
              message: "Bienvenido ".concat(updateUser.nombre),
              nameUser: updateUser.nombre
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

  return function validarEmail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //RECUPERAR CONTRASEÑA


exports.validarEmail = validarEmail;

var recuperarClave = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var email, user, token;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            email = req.body.email;
            _context3.next = 4;
            return _User.default.findOne({
              email: email
            });

          case 4:
            user = _context3.sent;

            if (user) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.json({
              err: true,
              message: 'Email no existente'
            }));

          case 7:
            token = _jsonwebtoken.default.sign({
              id: user._id
            }, process.env.SECRET);
            _context3.next = 10;
            return (0, _nodemailer.default)('recuperarClave', token, email);

          case 10:
            return _context3.abrupt("return", res.header('auth-token', token).json({
              err: null,
              token: token,
              message: "Se ah enviado mail en ".concat(user.email, " para recuperar clave")
            }));

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.json({
              err: true,
              message: _context3.t0.message
            }));

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 13]]);
  }));

  return function recuperarClave(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //Confimación de recuperacion de cuenta


exports.recuperarClave = recuperarClave;

var confrimRecuperarClave = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res) {
    var _req$body2, password, confirm, clave, updateUser;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body2 = req.body, password = _req$body2.password, confirm = _req$body2.confirm;

            if (!(password !== confirm)) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return", res.json({
              err: true,
              message: 'Las claves no coinciden'
            }));

          case 4:
            _context4.next = 6;
            return _User.default.encryptPassword(password);

          case 6:
            clave = _context4.sent;
            _context4.next = 9;
            return _User.default.findOneAndUpdate({
              _id: req.user.id
            }, {
              password: clave
            });

          case 9:
            updateUser = _context4.sent;

            if (updateUser) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", res.json({
              err: true,
              message: 'No se ha podido actualizar clave'
            }));

          case 12:
            return _context4.abrupt("return", res.json({
              err: null,
              message: "".concat(updateUser.nombre.toUpperCase(), ", se actualizo tu clave.")
            }));

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.json({
              err: true,
              message: _context4.t0.message
            }));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 15]]);
  }));

  return function confrimRecuperarClave(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //LOGIN


exports.confrimRecuperarClave = confrimRecuperarClave;

var loginUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(req, res) {
    var _req$body3, email, password, user, validatePassword, token, dataUsuario;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
            _context5.next = 4;
            return _User.default.findOne({
              email: email
            });

          case 4:
            user = _context5.sent;

            if (user) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.json({
              err: true,
              message: 'email o clave incorrecta'
            }));

          case 7:
            _context5.next = 9;
            return _User.default.comparePassword(password, user.password);

          case 9:
            validatePassword = _context5.sent;

            if (validatePassword) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", res.json({
              err: true,
              message: 'email o clave incorrecta'
            }));

          case 12:
            if (!user.bloqued) {
              _context5.next = 14;
              break;
            }

            return _context5.abrupt("return", res.json({
              err: true,
              message: "".concat(user.nombre, ", tu cuenta ha sido bloqueada")
            }));

          case 14:
            if (user.confirmMail) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return", res.json({
              err: true,
              message: "".concat(user.nombre, ", tu email no ha sido confirmado")
            }));

          case 16:
            //token
            token = _jsonwebtoken.default.sign({
              id: user._id
            }, process.env.SECRET);
            dataUsuario = {
              nombre: user.nombre,
              visitar: user.visitas
            }; //Message exito

            return _context5.abrupt("return", res.header('auth-token', token).json({
              err: null,
              message: "Hola ".concat(user.nombre.toUpperCase(), " :)"),
              data: dataUsuario,
              token: token
            }));

          case 21:
            _context5.prev = 21;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.json({
              err: true,
              message: _context5.t0.message
            }));

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 21]]);
  }));

  return function loginUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // Validar token 


exports.loginUser = loginUser;

var validateToken = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(req, res) {
    var user, informacion_usuario;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _User.default.findOne({
              _id: req.user.id
            });

          case 3:
            user = _context6.sent;

            if (user) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.json({
              err: true,
              message: 'usuario no existente'
            }));

          case 6:
            informacion_usuario = _objectSpread(_objectSpread({}, user.informacion), {}, {
              avatar: user.avatar
            });
            return _context6.abrupt("return", res.json({
              err: false,
              message: 'token & usuario correcto',
              data: informacion_usuario
            }));

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.json({
              err: true,
              message: _context6.t0.message
            }));

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 10]]);
  }));

  return function validateToken(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); //Updata data


exports.validateToken = validateToken;

var updateDataUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(req, res) {
    var update, userUpdate;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            update = req.body;
            _context7.next = 4;
            return _User.default.findOneAndUpdate({
              _id: req.user.id
            }, {
              informacion: update
            }, {
              new: true
            });

          case 4:
            userUpdate = _context7.sent;

            if (userUpdate) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", res.json({
              err: true,
              message: "".concat(userUpdate.nombre.toUpperCase(), ", no se ha podido actualizar :(.")
            }));

          case 7:
            return _context7.abrupt("return", res.json({
              err: null,
              message: "".concat(userUpdate.nombre.toUpperCase(), ", iformaci\xF3n actualizada :)."),
              data: userUpdate
            }));

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](0);
            return _context7.abrupt("return", res.json({
              err: true,
              message: _context7.t0.message
            }));

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 10]]);
  }));

  return function updateDataUser(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //Updata data


exports.updateDataUser = updateDataUser;

var updateGuardadosUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(req, res) {
    var id, user, publicacion, accion, userUpdate;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            id = req.params.id;
            _context8.next = 4;
            return _User.default.findOne({
              _id: req.user.id
            });

          case 4:
            user = _context8.sent;

            if (user) {
              _context8.next = 7;
              break;
            }

            return _context8.abrupt("return", res.json({
              err: true,
              message: 'Error de validación de usuario'
            }));

          case 7:
            _context8.next = 9;
            return _Auto.default.findOne({
              _id: id
            });

          case 9:
            publicacion = _context8.sent;

            if (publicacion) {
              _context8.next = 12;
              break;
            }

            return _context8.abrupt("return", res.json({
              err: true,
              message: 'No se ha podido encontrar publicación solicitada'
            }));

          case 12:
            accion = '';

            if (user.guardados.includes(id)) {
              accion = 'eliminado';
              user.guardados = user.guardados.filter(function (item) {
                return item.toString() !== id.toString();
              });
            } else {
              accion = 'guardado';
              user.guardados.push(publicacion._id);
            }

            _context8.next = 16;
            return _User.default.findOneAndUpdate({
              _id: req.user.id
            }, {
              guardados: user.guardados
            }, {
              new: true
            });

          case 16:
            userUpdate = _context8.sent;

            if (userUpdate) {
              _context8.next = 19;
              break;
            }

            return _context8.abrupt("return", res.json({
              err: true,
              message: "".concat(publicacion.titulo.toUpperCase(), ", no se ha podido guardar.")
            }));

          case 19:
            return _context8.abrupt("return", res.json({
              err: null,
              message: "".concat(publicacion.titulo.toUpperCase(), ", se ha ").concat(accion, " correctamente."),
              accion: accion,
              data: publicacion
            }));

          case 22:
            _context8.prev = 22;
            _context8.t0 = _context8["catch"](0);
            return _context8.abrupt("return", res.json({
              err: true,
              message: _context8.t0.message
            }));

          case 25:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 22]]);
  }));

  return function updateGuardadosUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}(); //Publicaciones del usuario y  Guardados


exports.updateGuardadosUser = updateGuardadosUser;

var getPublicacionesUser = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(req, res) {
    var user, guardados, publications;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _User.default.findOne({
              _id: req.user.id
            });

          case 3:
            user = _context9.sent;

            if (user) {
              _context9.next = 6;
              break;
            }

            return _context9.abrupt("return", res.json({
              err: true,
              message: 'Usuario no encontrado'
            }));

          case 6:
            _context9.next = 8;
            return _Auto.default.paginate({
              _id: {
                $in: user.guardados
              }
            }, {
              sort: '-createdAt',
              limit: 15
            });

          case 8:
            guardados = _context9.sent;
            _context9.next = 11;
            return _Auto.default.paginate({
              userId: req.user.id
            });

          case 11:
            publications = _context9.sent;
            publications.guardados = guardados;
            return _context9.abrupt("return", res.json({
              err: false,
              data: publications
            }));

          case 16:
            _context9.prev = 16;
            _context9.t0 = _context9["catch"](0);
            return _context9.abrupt("return", res.json({
              err: true,
              message: _context9.t0.message
            }));

          case 19:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 16]]);
  }));

  return function getPublicacionesUser(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}(); //Publicaciones del usuario update


exports.getPublicacionesUser = getPublicacionesUser;

var updatePublicacionesUser = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(req, res) {
    var validateCreate, publication;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _Auto.default.findOne({
              _id: req.params.id
            });

          case 3:
            validateCreate = _context10.sent;

            if (validateCreate) {
              _context10.next = 6;
              break;
            }

            return _context10.abrupt("return", res.json({
              err: true,
              message: 'No se ha encontrado publicación :('
            }));

          case 6:
            if (!(validateCreate.userId.toString() !== req.user.id)) {
              _context10.next = 8;
              break;
            }

            return _context10.abrupt("return", res.json({
              err: true,
              message: 'No tiene autorizacion para completar esta acción',
              validateCreate: req.user.id
            }));

          case 8:
            _context10.next = 10;
            return _Auto.default.findOneAndUpdate({
              _id: req.params.id
            }, req.body, {
              new: true
            });

          case 10:
            publication = _context10.sent;

            if (publication) {
              _context10.next = 13;
              break;
            }

            return _context10.abrupt("return", res.json({
              err: true,
              message: 'No se ha podido completar actualización :('
            }));

          case 13:
            return _context10.abrupt("return", res.json({
              err: false,
              data: publication,
              message: "".concat(publication.titulo, " se ha actualizado con exito! :)")
            }));

          case 16:
            _context10.prev = 16;
            _context10.t0 = _context10["catch"](0);
            return _context10.abrupt("return", res.json({
              err: true,
              message: _context10.t0.message
            }));

          case 19:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 16]]);
  }));

  return function updatePublicacionesUser(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}(); //Publicaciones del usuario delete


exports.updatePublicacionesUser = updatePublicacionesUser;

var deletePublicacionesUser = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(req, res) {
    var validateCreate, publication;
    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _Auto.default.findOne({
              _id: req.params.id
            });

          case 3:
            validateCreate = _context11.sent;

            if (validateCreate) {
              _context11.next = 6;
              break;
            }

            return _context11.abrupt("return", res.json({
              err: true,
              message: 'No se ha encontrado publicación :('
            }));

          case 6:
            if (!(validateCreate.userId.toString() !== req.user.id)) {
              _context11.next = 8;
              break;
            }

            return _context11.abrupt("return", res.json({
              err: true,
              message: 'No tiene autorizacion para completar esta acción',
              validateCreate: req.user.id
            }));

          case 8:
            _context11.next = 10;
            return _Auto.default.findOneAndRemove({
              _id: req.params.id
            });

          case 10:
            publication = _context11.sent;

            if (publication) {
              _context11.next = 13;
              break;
            }

            return _context11.abrupt("return", res.json({
              err: true,
              message: 'Error al intentar eliminar'
            }));

          case 13:
            return _context11.abrupt("return", res.json({
              err: false,
              data: publication,
              message: "".concat(publication.titulo, " se elimino con exito")
            }));

          case 16:
            _context11.prev = 16;
            _context11.t0 = _context11["catch"](0);
            return _context11.abrupt("return", res.json({
              err: true,
              message: _context11.t0.message
            }));

          case 19:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 16]]);
  }));

  return function deletePublicacionesUser(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}(); //ACTUALIZAR AVATAR USUARIO


exports.deletePublicacionesUser = deletePublicacionesUser;

var updateAvatarUser = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(req, res) {
    var user, data, userUpdate;
    return _regenerator.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _cloudinary.default.config({
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET
            });

            _context12.prev = 1;
            _context12.next = 4;
            return _User.default.findOne({
              _id: req.user.id
            });

          case 4:
            user = _context12.sent;

            if (user) {
              _context12.next = 7;
              break;
            }

            return _context12.abrupt("return", res.json({
              err: true,
              message: 'error de usuario'
            }));

          case 7:
            if (req.file) {
              _context12.next = 9;
              break;
            }

            return _context12.abrupt("return", res.json({
              err: true,
              message: 'error al enviar mas imagenes!'
            }));

          case 9:
            _context12.next = 11;
            return _cloudinary.default.v2.uploader.upload(req.file.path, {
              folder: 'autosUsados/avatar'
            });

          case 11:
            data = _context12.sent;
            _context12.next = 14;
            return _User.default.findOneAndUpdate({
              _id: req.user.id
            }, {
              avatar: data.url
            }, {
              new: true
            });

          case 14:
            userUpdate = _context12.sent;

            if (userUpdate) {
              _context12.next = 17;
              break;
            }

            return _context12.abrupt("return", res.json({
              err: true,
              message: 'No se ha podido actualizar avatar'
            }));

          case 17:
            //Eliminar
            _fsExtra.default.remove(req.file.path); //Respuesta exitosa


            return _context12.abrupt("return", res.json({
              err: null,
              message: "".concat(user.nombre, ", tu avatar se ha actualizado!"),
              data: data,
              image: data.url
            }));

          case 21:
            _context12.prev = 21;
            _context12.t0 = _context12["catch"](1);
            return _context12.abrupt("return", res.json({
              err: true,
              message: _context12.t0.message
            }));

          case 24:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[1, 21]]);
  }));

  return function updateAvatarUser(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.updateAvatarUser = updateAvatarUser;