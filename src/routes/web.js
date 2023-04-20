import express from "express";
import UserController from "../controllers/UserController";

let router = express.Router();
let initWebRoutes = (app) => {
  router.post("/api/user/login", UserController.UserLogin);
  router.post("/api/user/register", UserController.Register);
  router.get("/api/user/users-list", UserController.GetUsersList);
  router.put("/api/user/update", UserController.UpdateUser);
  router.delete("/api/user/delete", UserController.DeleteUser);

  return app.use("/", router);
};
module.exports = initWebRoutes;
