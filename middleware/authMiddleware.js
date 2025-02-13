const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token = req.cookies?.token; // Try getting token from cookies

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1]; // Get token from Authorization header
    }

    console.log("Token received:", token); // Debugging log

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Attach user details to request
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = authMiddleware;
