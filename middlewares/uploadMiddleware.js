import multer from "multer";
import path from "path";
import fs from "fs";

export const getUploadMiddleware = (type) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = `images/${type}`;
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  });

  return multer({ storage });
};
