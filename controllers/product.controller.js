const productCollection = require("../models/product.model");
const { uploadImg } = require("../utils/cloudinary.utils");

const addProduct = async (req, res) => {
  // console.log(req.files);
  let { name, description, price } = req.body;

  let localFilePaths = req.files;
  let uploadPromises = localFilePaths.map((file) => uploadImg(file.path));

  let results;
  try {
    results = await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Image upload failed" });
  }

  let imgArray = results.map((result) => ({ url: result.secure_url }));

  console.log(imgArray);

  let newProduct = await productCollection.create({
    name,
    description,
    price,
    images: imgArray,
    seller: req.user._id,
  });

  res.status(201).json({ message: "Product created successfully" });
};

module.exports = {
  addProduct,
};
