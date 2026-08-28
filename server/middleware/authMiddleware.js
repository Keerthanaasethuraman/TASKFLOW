const jwt = require("jsonwebtoken");

let token;

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
} else {
    // I guess I could also check cookies if I wanted to be fancy, 
    // but let's stick to headers for now.
    // console.log("No auth header found"); 
}

// If we didn't get a token, we gotta stop the request here.
if (!token) {
    return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
    });
}
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
        id: decoded.id,
    };
    // Everything looks good, move on to the next middleware
    next();
} catch (err) {
    console.log("Token verification failed: " + err.message);
    
    return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
    });
}
};

module.exports = protect;