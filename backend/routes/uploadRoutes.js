import path from "path";
import express from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

import pkg from "cloudinary";
const cloudinary = pkg;

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (!extname && !mimetype) {
    return cb(new Error("Only image upload is allowed!"), false);
  }
  cb(null, true);
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
/* let imageUpload = upload.single("imagem");

router.post("/", (req, res) => {
  imageUpload(req, res, (err) => {
    if (err) {
      console.log(err.message);
      res.status(400).json({
        status: "failed to upload",
        message: err,
      });
    } else {
      const file = req.file;
      console.log("file: ", file);
      if (!file) {
        res.status(400);
        throw new Error("Please upload a file");
      }
      res.status(200).json({
        status: "success",
        message: "file uploaded successfully",
        data: `/${req.file.path}`,
      });
    }
  });
});
 */

router.post(
  "/",
  upload.single("imagem"),
  asyncHandler(async (req, res) => {
    const uploadPhoto = await cloudinary.uploader.upload(`${req.file.path}`);
    res.send(uploadPhoto.url);
  })
);

export default router;
