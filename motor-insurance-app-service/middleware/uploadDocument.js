import moment from "moment";
import multer from "multer";

console.log("under multer is ... ")
/**
 * Storage
 */
let storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "uploads");
  },
  filename: (request, file, callback) => {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1]
    callback(null, getFilename(file) + "." + extension);
  },
});

/**
 * Retrieve Filename
 *
 * @param {File} file
 */
let getFilename = (file) => {
  return `${moment().unix()}-${file.originalname}`;
};

/**
 * Valid Image Mime Types
 */
const MimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/*", "application/pdf"];

/**
 * Upload Middleware
 */
let upload = multer({
  storage: storage,
  fileFilter: (request, file, callback) => {
    console.log("under multer ", file);
    if (MimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(() => {
        return {
          field: "documents",
          message: "Message format needs to be in pdf",
        };
      });
    }
  },
});

export default upload;
