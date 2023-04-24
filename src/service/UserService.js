import db from "../models/index";
import bcrypt from "bcryptjs";
var jwt = require("jsonwebtoken");
require("dotenv").config();
let userLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userInfo = {};
      let data = {};
      userInfo = await checkEmailIsExist(email);
      // console.log("userInfo", length(userInfo));
      if (userInfo) {
        let checkPassword = await bcrypt.compareSync(
          password,
          userInfo.password
        );
        // userInfo.password = "";
        if (checkPassword) {
          delete userInfo.password;
          //=-=-=-=-=-=-=-=-=-=
          const token = jwt.sign(
            { user_id: userInfo.id },
            process.env.TOKEN_KEY,
            {
              expiresIn: "24h",
            }
          );
          userInfo.token = token;
          //=-=-=-=-=-=-=-=-=-=

          return resolve({
            status: 200,
            message: "Login Success",
            data: userInfo,
          });
        } else {
          return resolve({ status: 404, message: "Password is Incorrect" });
        }
      } else {
        return resolve({
          status: 404,
          message: "Username or Password is Incorrect",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
};
let userRegister = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userInfo = {};
      let checkEmailExist = await checkEmailIsExist(body.email);
      if (checkEmailExist) {
        return resolve({
          status: 404,
          message: "Email already exist",
        });
      }
      if (!body.email || !body.codeName) {
        return resolve({
          status: 404,
          message: "Plz check input",
        });
      }
      if (!body.avatar && body.gender === true) {
        body.avatar =
          "https://assets.codepen.io/39255/internal/avatars/users/default.png?height=120&width=120";
      }
      if (!body.avatar && body.gender === false) {
        body.avatar =
          "https://media.istockphoto.com/id/1390707044/vi/vec-to/b%C3%B2-r%E1%BB%ABng-bizon.jpg?s=612x612&w=is&k=20&c=7jmY3RfSIzV7g3P4v-n_LjvAyP6nK40MGnjOoAEg_Qg=";
      }
      if (!body.backgroundPhoto) {
        body.backgroundPhoto =
          "https://kynguyenlamdep.com/wp-content/uploads/2021/12/anh-dam-may-scaled.jpg";
      }

      console.log("body", body);
      let newPassword = await hashPassword(body.password);

      userInfo = await db.users.create(
        {
          password: newPassword,
          firstName: body.firstName,
          email: body.email,
          lastName: body.lastName,
          address: body.address,
          codeName: body.codeName,
          phone: body.phone,
          gender: body.gender,
          introduce: body.introduce,
          avatar: body.avatar,
          backgroundPhoto: body.backgroundPhoto,
          userType: "member",
        },
        { logging: (msg) => console.log("loggggg hereeeee", msg) }
      );
      resolve({
        status: 200,
        message: "Register Success",
        data: userInfo,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let comparePassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (e) {
      reject(e);
    }
  });
};
let checkEmailIsExist = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let sql = ` SELECT * FROM users `;

      // if (email) {
      //   sql += `WHERE email = '${email}' limit 1`;
      // }
      // let user = await db.sequelize.query(sql);
      let user = await db.users.findOne({
        where: { email: email },
        raw: true,
      });
      console.log("user", user);
      if (user) {
        resolve(user);
      } else {
        resolve(user);
      }
    } catch (e) {
      reject(e);
    }
  });
};
// GetAllUsersList
let GetAllUsersList = (queryParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (queryParams.id === "all") {
        user = await db.users.findAndCountAll({
          offset: parseInt((queryParams.page - 1) * queryParams.limit),
          limit: parseInt(queryParams.limit),
          attributes: {
            exclude: ["password"],
          },
          order: [["id", "DESC"]],
          logging: console.log,
        });
        let meta = {};
        meta.CurrentPage = parseInt(queryParams.page);
        meta.CurrentCount = parseInt(user.rows.length);
        meta.TotalCount = parseInt(user.count);
        meta.TotalPage = parseInt(user.count / queryParams.limit) + 1;
        resolve({
          status: 200,
          message: "Get users list success!",
          data: user.rows,
          meta: meta,
        });
      } else {
        user = await db.users.findOne({
          attributes: {
            exclude: ["password"],
          },
          where: { id: queryParams.id },
        });
        resolve({
          status: 200,
          message: "Get users success!",
          data: user,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let EditUser = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!body.id) {
        resolve({
          status: 404,
          message: "Missing user id plz check input",
        });
      }
      let user = await db.users.findOne({
        where: { id: body.id },
        raw: false,
      });
      console.log("body", body);
      let newPassword = await hashPassword(body.password);
      if (user) {
        (user.password = newPassword),
          (user.firstName = body.firstName),
          (user.lastName = body.lastName),
          (user.address = body.address),
          (user.codeName = body.codeName),
          (user.phone = body.phone),
          (user.introduce = body.introduce),
          (user.avatar = body.avatar),
          (user.backgroundPhoto = body.backgroundPhoto),
          await user.save();
        resolve({
          status: 201,
          message: "Update Success",
        });
      } else {
        resolve({
          status: 404,
          message: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// DeleteUser
let DeleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.users.findOne({
        attributes: {
          exclude: ["password"],
        },
        where: { id: id },
      });
      if (!user) {
        resolve({
          status: 404,
          message: "User not found",
        });
      }
      await db.users.destroy({ where: { id: id } });
      resolve({
        status: 200,
        message: "Delete user success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  userLogin: userLogin,
  userRegister: userRegister,
  GetAllUsersList: GetAllUsersList,
  DeleteUser: DeleteUser,
  EditUser: EditUser,
};
