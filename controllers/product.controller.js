const productCollection = require("../models/product.model");
const { uploadImg } = require("../utils/cloudinary.utils");

const addProduct = async (req, res) => {
  console.log(req.files); // verify buffer exists

  let { name, description, price } = req.body;
  price = Number(price);

  const files = req.files;

  try {
    const uploadPromises = files.map((file) => uploadImg(file.buffer));
    const results = await Promise.all(uploadPromises);
    const imgArray = results.map((r) => ({ url: r.secure_url }));

    const newProduct = await productCollection.create({
      name,
      description,
      price,
      images: imgArray,
      seller: req.user._id,
    });

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).json({ error: "Product upload failed", details: error.message });
  }
};

module.exports = {
  addProduct,
};
