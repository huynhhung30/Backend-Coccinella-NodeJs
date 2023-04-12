import db from "../models/index";
import bcrypt from "bcryptjs";
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
          data.status = 200;
          data.message = "Login Success";
          delete userInfo.password;
          data.user = userInfo;
          return resolve(data);
        } else {
          data.status = 201;
          data.message = "Password is Incorrect";
          return resolve(data);
        }
      } else {
        data.status = 404;
        data.message = "Username or Password is Incorrect";
        return resolve(data);
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
      if (!body.email || !body.gender || !body.codeName) {
        userInfo.status = 404;
        userInfo.message = "Plz check input";
        return resolve(userInfo);
      }
      if (!body.avatar) {
        body.avatar =
          "https://kynguyenlamdep.com/wp-content/uploads/2021/12/anh-dam-may-scaled.jpg";
      }
      if (!body.backgroundPhoto) {
        body.backgroundPhoto =
          "https://kynguyenlamdep.com/wp-content/uploads/2021/12/anh-dam-may-scaled.jpg";
      }
      if (checkEmailExist) {
        userInfo.status = 404;
        userInfo.message = "Email already exist";
        console.log("checkEmailExist", checkEmailExist);
        return resolve(userInfo);
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
      userInfo.status = 201;
      userInfo.message = "Register Success";
      resolve(userInfo);
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
let GetAllUsersList = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = {};

      if (id === "all") {
        user = await db.users.findAll({
          attributes: {
            exclude: ["password"],
          },
          raw: true,
        });
        if (!user) {
          user.status = 200;
          user.message = "Get all users success";
          return resolve(user);
        }
        user.status = 404;
        user.message = "Data Not Found";
        return resolve(user);
      } else {
        user = await db.users.findOne({
          attributes: {
            exclude: ["password"],
          },
          where: { id: id },
          raw: true,
        });
        if (user) {
          user.status = 201;
          user.message = "Get user success";
          return resolve(user);
        }
        user.status = 404;
        user.message = "User Not Found";
        return resolve(user);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  userLogin: userLogin,
  userRegister: userRegister,
  GetAllUsersList: GetAllUsersList,
};
