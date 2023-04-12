import UserService from "../service/UserService";
import db from "../models/index";
require("dotenv").config();
// process.env.NAME_VARIABLES

let UserLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log("email", email);
  if (!email || !password) {
    return res.status(404).json({
      message: "Check your password or email is null",
    });
  }
  let data = await UserService.userLogin(email, password);

  return res.status(200).json({
    data,
  });
};

let Register = async (req, res) => {
  let body = req.body;
  let userInfo = await UserService.userRegister(body);
  return res.status(200).json({
    data: userInfo,
  });
};

let GetUsersList = async (req, res) => {
  let id = req.body.id;
  console.log("id", id);
  let data = await UserService.GetAllUsersList(id);
  console.log("data", data);
  return res.status(200).json({
    data: data,
    message: data.message,
    status: data.status,
  });
};

module.exports = {
  UserLogin: UserLogin,
  Register: Register,
  GetUsersList: GetUsersList,
};
