"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// config view engine for express app
var configViewEngine = function configViewEngine(app) {
  app.use(_express["default"]["static"]("./src/public"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
  app.use(_express["default"].json());
};
module.exports = configViewEngine;