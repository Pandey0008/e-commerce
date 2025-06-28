// const multer = require("multer");

// let myStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/temp");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-----" + file.originalname);
//   },
// });

// let uploads = multer({ storage: myStorage });

// module.exports = { uploads };

const multer = require("multer");

const storage = multer.memoryStorage(); // ✅ Use memory storage
const uploads = multer({ storage });

module.exports = { uploads };
