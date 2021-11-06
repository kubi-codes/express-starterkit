require("dotenv").config();
const model = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await model.users.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error("User not exist");
    }

    if (user && user.dataValues.is_login) {
      throw new Error("User already login");
    }

    const compare = bcrypt.compareSync(password, user.dataValues.password);

    if (!compare) {
      throw new Error("Wrong password");
    }

    await model.users.update({ is_login: 1 }, { where: { email } });

    const token = jwt.sign(req.body, process.env.APP_SECRET_KEY, {
      expiresIn: "24h",
    });

    res.json({
      status: "OK",
      messages: "",
      data: {
        token: token,
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      messages: error.message,
      data: null,
    });
  }
};

const register = async (req, res) => {
  try {
    const requestBody = req.body;
    const users = await model.users.findOne({
      where: { email: requestBody.email },
    });

    if (users) {
      throw new Error("User already registered");
    }

    const hashPassword = bcrypt.hashSync(requestBody.password, bcryptSalt);

    const create = await model.users.create({
      ...requestBody,
      ...{
        password: hashPassword,
        is_login: 0,
      },
    });

    if (!create) {
      throw new Error("Failed insert data");
    }

    res.status(201).json({
      status: "OK",
      messages: "insert success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      messages: error.message,
      data: null,
    });
  }
};

const logout = async (req, res) => {
  try {
    const { id } = req.params;
    await model.users.update({ is_login: 0 }, { where: { id } });
    res.json({
      status: "OK",
      messages: "Logout success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      messages: error.message,
      data: null,
    });
  }
};

module.exports = { login, register, logout };
