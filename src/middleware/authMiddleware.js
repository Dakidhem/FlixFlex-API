import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach user information to the request
    req.user = { userId: decoded.userId };

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export default verifyToken;
