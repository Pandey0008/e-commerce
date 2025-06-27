const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklist.model");

module.exports.isAuthenticated = async (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = req.headers.authorization.split(" ")[1];
        const isBlacklisted = await Blacklist.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}


module.exports.isSeller= async (req, res, next) => {
    try {
        if (req.user.role !== "seller") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    } catch (error) {
        next(error);
    }
}