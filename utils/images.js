const cloudinary = require("./cloudinary");
const { v4: uuidv4 } = require("uuid");

const uploadSingle = (req, res, next) => {
  let file = req.files.photo;

  cloudinary.v2.uploader.upload(
    file.tempFilePath,
    { public_id: uuidv4() },
    function (error, result) {
      req.body.photo = result;
      next();
    }
  );
};

module.exports = { uploadSingle };
