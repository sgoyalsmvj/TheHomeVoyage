const express = require("express");
const {
  uploadByLink,
  uploadPhoto,
  deleteFileFromS3,
} = require("../controllers/upload.controllers");
const multer = require("multer");
const uploadRouter = express.Router();
const photosMiddleware = multer({ dest: "uploads/" });


uploadRouter.post("/upload-by-link", uploadByLink);
uploadRouter.post(
  "/upload",
  photosMiddleware.array("photos", 100),
  uploadPhoto
);
uploadRouter.delete("/photos/:name",deleteFileFromS3)
module.exports = uploadRouter;
