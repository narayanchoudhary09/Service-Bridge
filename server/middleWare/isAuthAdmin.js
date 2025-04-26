import Admin from "../Modal/adminModal.js";
import jwt from "jsonwebtoken";
const { COOKIE_NAME, JWT_SECRET } = process.env;

export const isAdminAuth = async (req, res, next) => {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({
      success: false,
      messge: "Unauthorized Admin"
    });
  }
  try {
    const decoded = jwt.decode(token, JWT_SECRET);
    req.admin = await Admin.findById(decoded._id);
    next();
  } catch (e) {
    return res.json(401).json({
      success: false,
      message: "Unauthorized invalid admin"
    })
  }
}
