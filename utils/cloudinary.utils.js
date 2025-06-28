// const v2 = require("../config/cloudinary.config");

// const uploadImg = async (path) => {
//   try {
//     const result = await v2.uploader.upload(path, {
//       folder: "products",
//     });
//     // console.log(result);
//     return result;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// module.exports = { uploadImg };

const v2 = require("../config/cloudinary.config");

const uploadImg = async (fileBuffer) => {
  try {
    return await new Promise((resolve, reject) => {
      const stream = v2.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(fileBuffer);
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { uploadImg };
