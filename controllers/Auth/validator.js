module.exports = {
  loginValidator: {
    email: "required|maxLength:250",
    password: "required",
  },
  registerValidator: {
    email: "required|email|maxLength:250",
    password: "required",
  },
};
