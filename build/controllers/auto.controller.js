"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePublicacion = exports.getPublicaciones = exports.getPublicacion = exports.deletePublicacion = exports.createPublication = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Auto = _interopRequireDefault(require("../models/Auto"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _User = _interopRequireDefault(require("../models/User"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var validateInformacion = function validateInformacion(data, images) {
  var message = {
    err: false,
    message: ''
  };
  if (data.titulo.length <= 4) message = {
    err: true,
    message: 'EL TITULO ES DEMASIADO CORTO'
  };
  if (data.titulo.length > 50) message = {
    err: true,
    message: 'EL TITULO ES DEMASIADO LARGO'
  };
  if (images.length <= 0) return message = {
    err: true,
    message: 'NECESITAR SUBIR IMAGEN'
  };
  if (data.descripcion.length >= 2000) return message = {
    err: true,
    message: 'LA DESCRIPCION DEBE SER MENOR A 1000 CARACTERES'
  };
  return message;
};

var createPublication = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var statePublicacion, _req$body, titulo, precio, descripcion, unidadPrecio, tipoPublicacion, kilometros, carroceria, color, marca, modelo, transmision, informacion, auto, user, item, i, data;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _cloudinary.default.config({
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET
            });

            statePublicacion = validateInformacion(req.body, req.files);

            if (!statePublicacion.err) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.json({
              err: true,
              message: statePublicacion.message
            }));

          case 4:
            _context.prev = 4;
            //Capturar data del body
            _req$body = req.body, titulo = _req$body.titulo, precio = _req$body.precio, descripcion = _req$body.descripcion, unidadPrecio = _req$body.unidadPrecio, tipoPublicacion = _req$body.tipoPublicacion, kilometros = _req$body.kilometros, carroceria = _req$body.carroceria, color = _req$body.color, marca = _req$body.marca, modelo = _req$body.modelo, transmision = _req$body.transmision;
            informacion = {
              kilometros: kilometros,
              carroceria: carroceria,
              color: color,
              marca: marca,
              modelo: modelo,
              transmision: transmision
            }; //create model auto

            auto = new _Auto.default({
              titulo: titulo,
              precio: precio,
              unidadPrecio: unidadPrecio,
              descripcion: descripcion,
              informacion: informacion,
              tipoPublicacion: tipoPublicacion
            });
            auto.userId = req.user.id; // Validar usuario y su informacion completa

            _context.next = 11;
            return _User.default.findOne({
              _id: req.user.id
            });

          case 11:
            user = _context.sent;

            if (user) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.json({
              err: true,
              message: 'usuario no existe'
            }));

          case 14:
            _context.t0 = _regenerator.default.keys(user.informacion);

          case 15:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 22;
              break;
            }

            item = _context.t1.value;

            if (!(typeof user.informacion[item] === 'string')) {
              _context.next = 20;
              break;
            }

            if (!(user.informacion[item].length <= 0)) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return", res.json({
              err: true,
              message: "necesitas completar todos los datos de informacion."
            }));

          case 20:
            _context.next = 15;
            break;

          case 22:
            auto.user = user.informacion; //save imagenes in cloudinary

            i = 0;

          case 24:
            if (!(i < req.files.length)) {
              _context.next = 34;
              break;
            }

            _context.next = 27;
            return _cloudinary.default.v2.uploader.upload(req.files[i].path, {
              folder: 'autosUsados'
            });

          case 27:
            data = _context.sent;
            auto.imagesURL.push(data.url); //Remover image

            _context.next = 31;
            return _fsExtra.default.remove(req.files[i].path);

          case 31:
            i++;
            _context.next = 24;
            break;

          case 34:
            _context.next = 36;
            return auto.save();

          case 36:
            return _context.abrupt("return", res.json({
              err: null,
              auto: auto,
              message: "se ha creado ".concat(auto.titulo, " exitosamente!")
            }));

          case 39:
            _context.prev = 39;
            _context.t2 = _context["catch"](4);
            return _context.abrupt("return", res.json({
              err: true,
              message: _context.t2.message
            }));

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 39]]);
  }));

  return function createPublication(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //GET PUBLICACION


exports.createPublication = createPublication;

var getPublicacion = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var id, auto, referencia0, referencia1, relacionado1, relacionados2, guardado, user, relacionados, data;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _Auto.default.findOne({
              _id: id
            });

          case 4:
            auto = _context2.sent;

            if (auto) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.json({
              err: true,
              message: 'Publicación no existente'
            }));

          case 7:
            //Tomar Referencia
            referencia0 = 200000;
            referencia1 = 800; //Relacionados segun el precio caso dolar y caso peso

            if (!(auto.unidadPrecio === 'peso')) {
              _context2.next = 15;
              break;
            }

            _context2.next = 12;
            return _Auto.default.find({
              tipoPublicacion: auto.tipoPublicacion,
              $or: [{
                unidadPrecio: "peso",
                precio: {
                  $lte: auto.precio * +referencia0
                }
              }, {
                unidadPrecio: "dolar",
                precio: {
                  $lte: auto.precio / 310 + referencia1
                }
              }]
            }).sort('-createAt');

          case 12:
            relacionado1 = _context2.sent;
            _context2.next = 18;
            break;

          case 15:
            _context2.next = 17;
            return _Auto.default.find({
              tipoPublicacion: auto.tipoPublicacion,
              $or: [{
                unidadPrecio: "peso",
                precio: {
                  $lte: auto.precio * 310 + referencia0
                }
              }, {
                unidadPrecio: "dolar",
                precio: {
                  $lte: auto.precio + referencia1
                }
              }]
            }).sort('-createAt');

          case 17:
            relacionado1 = _context2.sent;

          case 18:
            _context2.next = 20;
            return _Auto.default.find({
              "informacion.carroceria": auto.informacion.carroceria
            }).sort('-createAt');

          case 20:
            relacionados2 = _context2.sent;
            //Guardar historial de visita del usuario
            guardado = false;

            if (!req.user) {
              _context2.next = 31;
              break;
            }

            _context2.next = 25;
            return _User.default.findOne({
              _id: req.user.id
            });

          case 25:
            user = _context2.sent;

            if (user.visitas.includes(auto.informacion.marca)) {
              _context2.next = 30;
              break;
            }

            if (user.visitas.length < 5) user.visitas.push(auto.informacion.marca);else {
              user.visitas.shift();
              user.visitas.push(auto.informacion.marca);
            }
            _context2.next = 30;
            return _User.default.findByIdAndUpdate({
              _id: req.user.id
            }, user, {
              new: true
            });

          case 30:
            // Saber si el usuario tiene guardado 
            if (user.guardados.includes(auto._id)) {
              user.guardados = user.guardados.filter(function (item) {
                return item.toString() !== id.toString();
              });
              guardado = true;
            }

          case 31:
            relacionado1 = relacionado1.filter(function (item) {
              return item._id.toString() !== auto._id.toString();
            });
            relacionados2 = relacionados2.filter(function (item) {
              return item._id.toString() !== auto._id.toString();
            });
            relacionados = [relacionado1, relacionados2];
            data = _objectSpread(_objectSpread({}, auto._doc), {}, {
              relacionados: relacionados
            });
            data.guardado = guardado; //Respuesta exitosa!

            return _context2.abrupt("return", res.json({
              err: null,
              data: data
            }));

          case 39:
            _context2.prev = 39;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.json({
              err: true,
              message: _context2.t0.message
            }));

          case 42:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 39]]);
  }));

  return function getPublicacion(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //GET PUBLICACIONES


exports.getPublicacion = getPublicacion;

var getPublicaciones = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var _req$params$id, id, _req$query, _req$query$limit, limit, _req$query$page, page, _req$query$sort, sort, data, recomedacionesHistorial, historial, user, filterQuery, item;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            //Obtener querys(filtros)
            _req$params$id = req.params.id, id = _req$params$id === void 0 ? 'all' : _req$params$id;
            _req$query = req.query, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 21 : _req$query$limit, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$sort = _req$query.sort, sort = _req$query$sort === void 0 ? '-createdAt' : _req$query$sort;
            data = [];
            recomedacionesHistorial = [];
            historial = [];

            if (!req.user) {
              _context3.next = 11;
              break;
            }

            _context3.next = 9;
            return _User.default.findOne({
              _id: req.user.id
            });

          case 9:
            user = _context3.sent;
            if (user.visitas.length > 0) historial = user.visitas;

          case 11:
            ; // Query filtros

            filterQuery = {
              "informacion.marca": req.query.marca || null,
              "informacion.color": req.query.color || null,
              "informacion.carroceria": req.query.carroceria || null,
              "informacion.kilometros": parseInt(req.query.kilometros) || null,
              "user.residencia": req.query.residencia || null
            };

            for (item in filterQuery) {
              if (filterQuery[item]) {
                if (item === "informacion.kilometros") filterQuery[item] = {
                  $lte: filterQuery[item]
                };else filterQuery[item] = {
                  $regex: '.*' + filterQuery[item] + '.*',
                  $options: "i"
                };
              } else delete filterQuery[item];
            } //Traer todos las publicaciones


            if (!(id === 'all')) {
              _context3.next = 29;
              break;
            }

            if (!(historial.length > 0)) {
              _context3.next = 24;
              break;
            }

            _context3.next = 18;
            return _Auto.default.paginate({
              "informacion.marca": {
                $in: historial
              }
            }, {
              limit: limit,
              page: page,
              sort: sort
            });

          case 18:
            recomedacionesHistorial = _context3.sent;
            _context3.next = 21;
            return _Auto.default.paginate(filterQuery, {
              limit: limit,
              page: page,
              sort: sort
            });

          case 21:
            data = _context3.sent;
            _context3.next = 27;
            break;

          case 24:
            _context3.next = 26;
            return _Auto.default.paginate(filterQuery, {
              limit: limit,
              page: page,
              sort: sort
            });

          case 26:
            data = _context3.sent;

          case 27:
            _context3.next = 39;
            break;

          case 29:
            if (!(id === 'auto' || id === 'moto' || id === 'accesorio')) {
              _context3.next = 36;
              break;
            }

            // Realizar busqueda segun tipo de publicación
            filterQuery.tipoPublicacion = id;
            _context3.next = 33;
            return _Auto.default.paginate(filterQuery, {
              limit: limit,
              page: page,
              sort: sort
            });

          case 33:
            data = _context3.sent;
            _context3.next = 39;
            break;

          case 36:
            _context3.next = 38;
            return _Auto.default.paginate({
              $or: [{
                titulo: {
                  $regex: '.*' + id + '.*',
                  $options: "i"
                }
              }, {
                tipoPublicacion: {
                  $regex: '.*' + id + '.*',
                  $options: "i"
                }
              }, {
                "informacion.color": {
                  $regex: '.*' + id + '.*',
                  $options: "i"
                }
              }, {
                "informacion.marca": {
                  $regex: '.*' + id + '.*',
                  $options: "i"
                }
              }, {
                "informacion.carroceria": {
                  $regex: '.*' + id + '.*',
                  $options: "i"
                }
              }]
            }, {
              limit: limit,
              page: page,
              sort: sort
            });

          case 38:
            data = _context3.sent;

          case 39:
            if (recomedacionesHistorial.length <= 0) recomedacionesHistorial = data;
            data.recomendacion = recomedacionesHistorial.docs; //Respuesta exitosa!

            return _context3.abrupt("return", res.json({
              err: null,
              data: data
            }));

          case 44:
            _context3.prev = 44;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.json({
              err: true,
              message: _context3.t0.message
            }));

          case 47:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 44]]);
  }));

  return function getPublicaciones(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //UPDATE PUBLICACION


exports.getPublicaciones = getPublicaciones;

var updatePublicacion = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res) {
    var id, update, auto, autoUpdate;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            //Capturar id y datos a actualizar
            id = req.params.id;
            update = req.body; //Verificar si el elem a update es del usuario

            _context4.next = 5;
            return _Auto.default.findOne({
              _id: id
            });

          case 5:
            auto = _context4.sent;

            if (auto) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.json({
              err: true,
              message: 'auto con ese id no encontrado'
            }));

          case 8:
            if (!(req.user.id !== auto.userId.toString())) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.json({
              err: true,
              message: 'La publicacion no es del usuario'
            }));

          case 10:
            _context4.next = 12;
            return _Auto.default.findOneAndUpdate({
              _id: id
            }, update, {
              new: true
            });

          case 12:
            autoUpdate = _context4.sent;

            if (autoUpdate) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", res.json({
              err: true,
              message: 'Error al intentar actualizar'
            }));

          case 15:
            return _context4.abrupt("return", res.json({
              err: null,
              message: "La publicaci\xF3n ".concat(autoUpdate.titulo, " Actualizo con exito"),
              data: autoUpdate
            }));

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.json({
              err: true,
              message: _context4.t0.message
            }));

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 18]]);
  }));

  return function updatePublicacion(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //DELETE PUBLICACION


exports.updatePublicacion = updatePublicacion;

var deletePublicacion = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(req, res) {
    var id, auto, autoDelete;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            //Capturar id de elemento a eliminar
            id = req.params.id; //Verificar si el elem a update es del usuario

            _context5.next = 4;
            return _Auto.default.findOne({
              _id: id
            });

          case 4:
            auto = _context5.sent;

            if (auto) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.json({
              err: true,
              message: 'auto con ese id no encontrado'
            }));

          case 7:
            if (!(req.user.id !== auto.userId.toString())) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.json({
              err: true,
              message: 'La publicacion no es del usuario'
            }));

          case 9:
            _context5.next = 11;
            return _Auto.default.findOneAndDelete({
              _id: id
            });

          case 11:
            autoDelete = _context5.sent;

            if (autoDelete) {
              _context5.next = 14;
              break;
            }

            return _context5.abrupt("return", res.json({
              err: true,
              message: 'Error al intentar eliminar'
            }));

          case 14:
            return _context5.abrupt("return", res.json({
              err: null,
              message: "Se ha eliminado ".concat(autoDelete.titulo)
            }));

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.json({
              err: true,
              message: _context5.t0.message
            }));

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 17]]);
  }));

  return function deletePublicacion(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deletePublicacion = deletePublicacion;