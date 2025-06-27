const productModel = require("../models/product.model");
const { addProduct } = require("../controllers/product.controller");
const { uploads } = require("../middlewares/multer.middleware");
const { isAuthenticated, isSeller } = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();

router.use(isAuthenticated).use(isSeller);

router.post("/create-product", uploads.array("images"), addProduct);

module.exports = router;