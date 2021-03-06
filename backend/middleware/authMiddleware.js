import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  try {
    // Retrieve token from the header
    let token = req.headers.authorization.replace("Bearer ", "");
    /*     const token = req.cookies.x_token;
     */
    //console.log("token: ", token);

    // Protection if no token provided
    if (!token) throw new Error("Not authorized - No token provided");

    // Verify if token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check the user's tokens array, check if the token still exists
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error("Invalid token");

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log("ERROR: ", error.message);
    res.status(401);
    throw new Error("Please authenticate to proceed");
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, isAdmin };
