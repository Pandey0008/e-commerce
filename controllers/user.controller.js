const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklist.model");
const Product = require("../models/product.model");



module.exports.signup = async (req, res , next) => {
try {
    const { password, email ,  username , role } = req.body;
    if (!password || !email || !username) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const ifserAlreadyExists = await User.findOne({ email });
    if (ifserAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role, username });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ message: "User created successfully", user, token });
} catch (error) {
    next(error);
}
}

module.exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "User logged in successfully", user, token });
} catch (error) {
    next(error);
}
}



module.exports.logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        await Blacklist.create({ token });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        next(error);
    }
}



module.exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ message: "User profile fetched successfully", user });
    } catch (error) {
        next(error);
    }
}

module.exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

module.exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}
