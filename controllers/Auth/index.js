require("dotenv").config();
const model = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const bcryptSalt = bcrypt.genSaltSync(10);

const findUser = async (email) =>
  await model.users.findOne({
    where: { email },
  });

module.exports = {
  // post auth/login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const find = await findUser(email);

      if (!find) throw { code: 400, message: "User not exist" };

      // single login feature checking
      if (find && find?.dataValues?.is_login) {
        throw new Error("User already login");
      }

      const compare = bcrypt.compareSync(password, find?.dataValues?.password);

      if (!compare) throw { code: 422, message: "Wrong password" };

      const changeStatusLogin = model.users.update(
        { is_login: 1 },
        { where: { email } }
      );

      if (!changeStatusLogin) throw { code: 500, message: "Something wrong" };
      const { password: pass, ...result } = find?.dataValues ?? {};
      const token = jwt.sign(result, process.env.APP_SECRET_KEY, {
        expiresIn: "24h",
      });

      res.json({
        status: "OK",
        messages: "",
        data: {
          token: token,
          result: result,
        },
      });
    } catch (error) {
      res.status(error?.code ?? 500).json({
        status: "ERROR",
        messages: error?.message ?? "Something wrong",
        data: null,
      });
    }
  },

  // post auth/register
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const find = await findUser(email);

      if (find) throw { code: 400, message: "User already registered" };

      const hashPassword = bcrypt.hashSync(password, bcryptSalt);
      const createUser = await model.users.create({
        email,
        password: hashPassword,
        is_login: 0,
      });

      if (!createUser) throw { code: 500, message: "Failed insert data" };

      res.status(201).json({
        status: "OK",
        messages: "insert success",
        data: null,
      });
    } catch (error) {
      res.status(error?.code ?? 500).json({
        status: "ERROR",
        messages: error?.message ?? "Something wrong",
        data: null,
      });
    }
  },

  // get auth/logout
  logout: (req, res) => {
    try {
      const token = req.headers.authorization.slice(6).trim();
      const { email } = jwt.verify(token, process.env.APP_SECRET_KEY);

      const changeStatusLogin = model.users.update(
        { is_login: 0 },
        { where: { email } }
      );

      if (!changeStatusLogin) throw { code: 500, message: "Something wrong" };

      res.json({
        status: "OK",
        messages: "Logout success",
        data: null,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        messages: error?.message ?? "Something wrong",
        data: null,
      });
    }
  },
};
