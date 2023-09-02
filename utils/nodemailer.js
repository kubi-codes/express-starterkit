"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "peworld08@gmail.com",
    pass: "yujeuffxcifqrfxq",
  },
});

module.exports = transporter;