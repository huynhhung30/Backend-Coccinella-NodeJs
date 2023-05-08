"use strict";

var _express = _interopRequireDefault(require("express"));
var _UserController = _interopRequireDefault(require("../controllers/UserController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initWebRoutes = function initWebRoutes(app) {
  router.post("/api/user/login", _UserController["default"].UserLogin);
  router.post("/api/user/register", _UserController["default"].Register);
  router.get("/api/user/users-list", _UserController["default"].GetUsersList);
  router.put("/api/user/update", _UserController["default"].UpdateUser);
  router["delete"]("/api/user/delete", _UserController["default"].DeleteUser);
  return app.use("/", router);
};
module.exports = initWebRoutes;