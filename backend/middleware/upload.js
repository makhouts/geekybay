import multer from "multer";
import sharp from "sharp";
import path from "path";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
//using a multer function uploading several images.
const uploadFiles = upload.array("productImg", 5); // limit to 5 images

//uploads images to the upload array.
const uploadImages = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        // Too many images exceeding the allowed limit
        return res.send(err);
      }
    } else if (err) {
      throw err;
    }
    // Everything is ok.
    next();
  });
};

//dc

//resize images, using sharp
const resizeImages = async (req, res, next) => {
  if (!req.files) return next();
  req.body.productImg = [];
  await Promise.all(
    req.files.map(async (file) => {
      const newFilename = Date.now() + "_" + file.originalname.split(".")[0] + path.extname(file.originalname);

      await sharp(file.buffer).toFormat("png").png({ quality: 100 }).toFile(`uploads/${newFilename}`);
      req.body.productImg.push(newFilename);
    })
  );
  next();
};

//Todo create class/function and fix input sanitize.
const storeImage = async () => {};

//show which images were uploaded.
const getResult = async (req, res, next) => {
  if (req.body.productImg.length <= 0) return next();
  const images = req.body.productImg.map((image) => "" + image + "").join("");
  next();
};

export { uploadImages, resizeImages, getResult };
