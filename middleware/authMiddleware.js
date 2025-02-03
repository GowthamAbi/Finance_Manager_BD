const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("Cookies received:", req.cookies); // Debugging log

    if (!req.cookies || !req.cookies.token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = authMiddleware;

