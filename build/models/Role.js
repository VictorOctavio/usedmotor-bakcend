"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var roleSchema = (0, _mongoose.Schema)({
  name: String
}, {
  versionKey: false
});

var _default = (0, _mongoose.model)('role', roleSchema);

exports.default = _default;