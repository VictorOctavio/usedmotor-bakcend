"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = require("nodemailer");

var _nodemailerMSG = _interopRequireDefault(require("./nodemailerMSG"));

function sendEmail(_x, _x2, _x3, _x4) {
  return _sendEmail.apply(this, arguments);
}

function _sendEmail() {
  _sendEmail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(accion, token, email, message) {
    var textHTML, transporter;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            textHTML = "";
            if (accion === 'confirm') textHTML = _nodemailerMSG.default.verifyMail(token);else if (accion === 'recuperarClave') textHTML = _nodemailerMSG.default.recuperarClave(token);else if (accion === ('users' || 'subs')) textHTML = sendEmail.messageUsers(message);
            transporter = (0, _nodemailer.createTransport)({
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: process.env.USER,
                pass: process.env.PASS
              }
            });
            _context.next = 6;
            return transporter.sendMail({
              from: 'Bienvenido a UsadoAutos <usadosautos@gmail.com>',
              to: email,
              subject: 'Empieza a publicar o ver autos ahora mismo',
              html: textHTML
            });

          case 6:
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", console.log(_context.t0.message));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _sendEmail.apply(this, arguments);
}

var _default = sendEmail;
exports.default = _default;