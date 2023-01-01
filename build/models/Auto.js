"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));

var autoSchema = (0, _mongoose.Schema)({
  tipoPublicacion: String,
  titulo: String,
  precio: Number,
  unidadPrecio: String,
  userId: {
    ref: 'user',
    type: _mongoose.Schema.Types.ObjectId
  },
  informacion: {
    kilometros: Number,
    carroceria: String,
    color: String,
    marca: String,
    modelo: Number,
    transmision: String
  },
  descripcion: String,
  imagesURL: Array,
  user: {
    telefono: String,
    residencia: String,
    correoElectronico: String,
    whatsapp: String
  }
}, {
  versionKey: false,
  timestamps: true
});
autoSchema.plugin(_mongoosePaginateV.default);

var _default = (0, _mongoose.model)('auto', autoSchema);

exports.default = _default;