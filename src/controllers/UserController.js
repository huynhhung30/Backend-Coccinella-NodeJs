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
  let query = {};
  query.limit = req.query.limit;
  query.page = req.query.page;
  query.id = req.query.id;
  console.log("=-=-=query-=-", query);
  if (!query.id) {
    return res.status(404).json({
      status: 404,
      message: "Missing required Parameter",
      data: [],
    });
  }
  let result = await UserService.GetAllUsersList(query);
  return res.status(200).json({
    data: result,
  });
};
let UpdateUser = async (req, res) => {
  let body = req.body;
  let userInfo = await UserService.EditUser(body);
  return res.status(200).json({
    data: userInfo,
  });
};
// Delete User
let DeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      status: 404,
      message: "Missing ID User plz check input",
    });
  }

  let userInfo = await UserService.DeleteUser(req.body.id);
  return res.status(200).json({
    data: userInfo,
  });
};
module.exports = {
  UserLogin: UserLogin,
  Register: Register,
  GetUsersList: GetUsersList,
  UpdateUser: UpdateUser,
  DeleteUser: DeleteUser,
};
