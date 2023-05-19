import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/ViewEngine";
import webRoutes from "./routes/web";
import connectDB from "./config/ConnectDB";
import cors from "cors";
require("dotenv").config();
let app = express();
app.get("/", (req, res) => {
  res.json({
    msg:"Docker run here! shut the fuck up"
  })
})
// app.use(cors({ origin: true }));
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

// config view engine

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);

// config web routes

webRoutes(app);

connectDB();
let port = process.env.PORT || 8080;
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

app.listen(port, () => {
  console.log("SRC Backend running at the port: " + port);
});
