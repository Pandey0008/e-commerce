const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/mongodb");
const indexRoutes = require("./routes/index.routes");
const userRoutes = require("./routes/user.routes");
const productsRoutes = require("./routes/products.routes");

connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/products", productsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
