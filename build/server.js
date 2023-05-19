"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _ViewEngine = _interopRequireDefault(require("./config/ViewEngine"));
var _web = _interopRequireDefault(require("./routes/web"));
var _ConnectDB = _interopRequireDefault(require("./config/ConnectDB"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require("dotenv").config();
var app = (0, _express["default"])();
app.get("/", function (req, res) {
  res.json({
    msg: "Docker run here! shut the fuck up"
  });
});
// app.use(cors({ origin: true }));
app.use((0, _cors["default"])({
  origin: function origin(_origin, callback) {
    return callback(null, true);
  },
  credentials: true
}));

// config view engine

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
(0, _ViewEngine["default"])(app);

// config web routes

(0, _web["default"])(app);
(0, _ConnectDB["default"])();
var port = process.env.PORT || 8080;
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Credenttials", true);
//   res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "POST, GET, PUT, DELETE, PATCH, OPTIONS"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "x-requested-with, content-type"
//   );
//   next();
// });

app.listen(port, function () {
  console.log("(BUILD)Backend running at the port: " + port);
});