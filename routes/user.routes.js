const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  logout,
  getProfile,
  getProducts,
  getProductById,
} = require("../controllers/user.controller");
const { isAuthenticated ,  } = require("../middlewares/auth.middleware");
const { addProduct  } = require("../controllers/product.controller");
const { uploads } = require("../middlewares/multer.middleware");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/profile", isAuthenticated, getProfile);

router.get("/products", isAuthenticated, getProducts);
router.get("/products/:id", isAuthenticated, getProductById);

module.exports = router;
