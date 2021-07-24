const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage, //where to store
  limits: {
    fileSize: 1024 * 1024 * 5, //5mb
  },
  fileFilter: fileFilter, //type of file
});

module.exports = upload;
