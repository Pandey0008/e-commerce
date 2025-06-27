const v2 = require("../config/cloudinary.config");

const uploadImg = async (path) => {
  try {
    const result = await v2.uploader.upload(path, {
      folder: "products",
    });
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { uploadImg };
