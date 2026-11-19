import { config } from "@/config";
import multer from "multer";
import fs from "fs";

if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}

// Define storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(config.uploadDir, '-----config.uploadDir-----');

    cb(null, config.uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const sanitizedFilename = file.originalname.replace(/\s+/g, "_");
    cb(null, `${uniqueSuffix}-${sanitizedFilename}`);
  },
});

// Multer instance with file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
