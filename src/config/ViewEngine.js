import express from "express";
// config view engine for express app
let configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
  app.use(express.json());
};

module.exports = configViewEngine;
