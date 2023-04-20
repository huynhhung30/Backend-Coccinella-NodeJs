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
      if (checkEmailExist) {
        userInfo.status = 404;
        userInfo.message = "Email already exist";
        console.log("checkEmailExist", checkEmailExist);
        return resolve(userInfo);
      }
      if (!body.email || !body.codeName) {
        userInfo.status = 404;
        userInfo.message = "Plz check input";
        return resolve(userInfo);
      }
      if (!body.avatar && body.gender === 1) {
        body.avatar =
          "https://assets.codepen.io/39255/internal/avatars/users/default.png?height=120&width=120";
      }
      if (!body.avatar && body.gender === 0) {
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
      userInfo.status = 200;
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
      let user = "";
      if (id === "all") {
        user = await db.users.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (id && id !== "all") {
        user = await db.users.findOne({
          attributes: {
            exclude: ["password"],
          },
          where: { id: id },
        });
      }
      resolve(user);
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
