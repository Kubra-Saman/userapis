import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    
    req.user = decoded; // Attach decoded user data to the request
    console.log(req.user);
    
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default verifyToken;
