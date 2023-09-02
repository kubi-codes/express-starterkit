const model = require("../../models");
const setRedis = require("../../utils/setRedis");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  // get users
  upload: (req, res) => {
    const fileName = req.files.images.name;
    const fileExtension = fileName.split(".").pop();
    const uploadPath =
      require("path").resolve("./") +
      "/public/images/" +
      uuidv4() +
      "-" +
      new Date().getTime() +
      "." +
      fileExtension;

    req.files.images.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.send("File uploaded to " + uploadPath);
    });
  },
};
