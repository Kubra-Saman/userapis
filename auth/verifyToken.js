import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ","");
  if (!token) {
    throw new Error("invalid authorization");
  }
  try {
    const isMatch = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (!isMatch) {
      throw new Error("invalid authorization token");
    }
    req.user = isMatch;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default verifyToken;
