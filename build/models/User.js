"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));

var userSchema = (0, _mongoose.Schema)({
  nombre: String,
  email: String,
  confirmMail: {
    default: false,
    type: Boolean
  },
  password: String,
  roles: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "role"
  }],
  bloqued: {
    type: Boolean,
    default: false
  },
  guardados: [{
    ref: 'auto',
    type: _mongoose.Schema.Types.ObjectId
  }],
  informacion: {
    telefono: String,
    whatsapp: String,
    residencia: String,
    correoElectronico: String
  },
  visitas: Array,
  avatar: {
    type: String,
    default: 'https://kahoot.com/files/2018/02/padraic_avatar.png'
  }
}, {
  timestamps: true,
  versionKey: false
});

userSchema.statics.encryptPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(password) {
    var salt;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcrypt.default.genSalt(10);

          case 2:
            salt = _context.sent;
            _context.next = 5;
            return _bcrypt.default.hash(password, salt);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

userSchema.statics.comparePassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(pass, password) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcrypt.default.compare(pass, password);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

userSchema.plugin(_mongoosePaginateV.default);

var _default = (0, _mongoose.model)('user', userSchema);

exports.default = _default;