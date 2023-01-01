"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var CTRL = _interopRequireWildcard(require("../controllers/user.controller"));

var _verifyToken = require("../middlewares/verifyToken");

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _uuid = require("uuid");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)(); //Config Multer

var storage = _multer.default.diskStorage({
  destination: _path.default.join(__dirname, '../public/uploads'),
  filename: function filename(req, file, cb) {
    return cb(null, (0, _uuid.v4)() + _path.default.extname(file.originalname).toLocaleLowerCase());
  }
});

var configMulter = (0, _multer.default)({
  storage: storage
}).single('image');
router.post('/register', CTRL.createUser);
router.post('/login', CTRL.loginUser);
router.get('/verify-email', _verifyToken.verifyToken, CTRL.validarEmail);
router.put('/user', _verifyToken.verifyToken, CTRL.updateDataUser);
router.put('/user/avatar', _verifyToken.verifyToken, configMulter, CTRL.updateAvatarUser);
router.put('/user/guardados/:id', _verifyToken.verifyToken, CTRL.updateGuardadosUser); //Validar token correcto

router.get('/verify-token', _verifyToken.verifyToken, CTRL.validateToken); //Publicaiones

router.get('/publicaciones/user', _verifyToken.verifyToken, CTRL.getPublicacionesUser);
router.put('/publicacion/user/edit/:id', _verifyToken.verifyToken, CTRL.updatePublicacionesUser);
router.delete('/publicacion/user/delete/:id', _verifyToken.verifyToken, CTRL.deletePublicacionesUser); // Recuperar clave

router.post('/recuperar-clave', CTRL.recuperarClave);
router.put('/recuperar-clave/confirm', _verifyToken.verifyToken, CTRL.confrimRecuperarClave);
var _default = router;
exports.default = _default;