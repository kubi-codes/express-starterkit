require("dotenv").config();
const model = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);

module.exports = {
  // post auth/login
  login: (req, res) => {
    const { email, password } = req.body;

    model.users
      .findOne({
        where: { email: email },
      })
      .then((result) => {
        if (!result) throw new Error("User not existt");

        if (result && result.dataValues.is_login) {
          throw new Error("User already login");
        }

        return result;
      })
      .then((result) => {
        const compare = bcrypt.compareSync(
          password,
          result.dataValues.password
        );
        if (!compare) throw new Error("Wrong password");

        model.users
          .update({ is_login: 1 }, { where: { email } })
          .then((status) => {
            if (!status[0]) throw new Error("Something wrong");

            const token = jwt.sign(req.body, process.env.APP_SECRET_KEY, {
              expiresIn: "24h",
            });

            res.json({
              status: "OK",
              messages: "",
              data: {
                token: token,
                result,
              },
            });
          });
      })
      .catch((error) =>
        res.status(401).json({
          status: "ERROR",
          messages: error.message,
          data: null,
        })
      );
  },

  // post auth/register
  register: (req, res) => {
    const requestBody = req.body;

    model.users
      .findOne({
        where: { email: requestBody.email },
      })
      .then((result) => {
        if (result) throw new Error("User already registered");

        const hashPassword = bcrypt.hashSync(requestBody.password, bcryptSalt);

        return model.users.create({
          ...requestBody,
          ...{
            password: hashPassword,
            is_login: 0,
          },
        });
      })
      .then((result) => {
        if (!result) throw new Error("Failed insert data");

        res.status(201).json({
          status: "OK",
          messages: "insert success",
          data: null,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message || "Something wrong",
          data: null,
        })
      );
  },

  // get auth/logout
  logout: (req, res) => {
    const { id } = req.params;

    model.users
      .update({ is_login: 0 }, { where: { id } })
      .then((result) => {
        if (!result[0]) throw new Error("Failed logout");

        res.json({
          status: "OK",
          messages: "Logout success",
          data: null,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message,
          data: null,
        })
      );
  },
};
