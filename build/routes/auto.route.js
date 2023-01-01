"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _uuid = require("uuid");

var CTRL = _interopRequireWildcard(require("../controllers/auto.controller"));

var _verifyToken = require("../middlewares/verifyToken");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Inicializar router
var router = (0, _express.Router)(); //Config Multer

var storage = _multer.default.diskStorage({
  destination: _path.default.join(__dirname, '../public/uploads'),
  filename: function filename(req, file, cb) {
    return cb(null, (0, _uuid.v4)() + _path.default.extname(file.originalname).toLocaleLowerCase());
  }
});

var configMulter = (0, _multer.default)({
  storage: storage
}).array('images', 10); //Rutas

router.post('/publication', configMulter, _verifyToken.verifyToken, CTRL.createPublication);
router.get('/publication/:id', _verifyToken.getToken, CTRL.getPublicacion);
router.get('/publications/:id?', _verifyToken.getToken, CTRL.getPublicaciones);
router.put('/publication/:id', _verifyToken.verifyToken, CTRL.updatePublicacion);
router.delete('/publication/:id', _verifyToken.verifyToken, CTRL.deletePublicacion);
var _default = router;
exports.default = _default;