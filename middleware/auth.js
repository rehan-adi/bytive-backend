import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

 const auth = async (req, res, next) => {
  try {
    let token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    // Verify the token
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Token is invalid" });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Something went wrong while validating the token`,
    });
  }
};

export default auth;