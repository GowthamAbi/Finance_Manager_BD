const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        let token = req.cookies?.token; // Try getting token from cookies

        // If no token in cookies, check Authorization header
        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1]; // Extract token
        }

        console.log("🔹 Received Token:", token ? "✅ Present" : "❌ Missing"); // Debugging log

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure `req.user` contains the correct user ID key (id OR userId)
        req.user = { id: decoded.userId || decoded.id };  // ✅ Works for both cases
        console.log("✅ Authenticated User ID:", req.user.id);

        next(); // Proceed to next middleware
    } catch (err) {
        console.error("❌ Token verification failed:", err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;
