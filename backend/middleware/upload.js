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
    fileFilter: multerFilter
});

const uploadFiles = upload.array("productImg", 5); // limit to 5 images

const uploadImages = (req, res, next) => {
    uploadFiles(req, res, err => {
        if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
            if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
                // ...
            }
        } else if (err) {
            // handle other errors
        }
        // Everything is ok.
        next();
    });
};
const resizeImages = async (req, res, next) => {
    if (!req.files) return next();
    req.body.productImg = [];
    await Promise.all(
        req.files.map(async file => {
            const newFilename = Date.now() + "_"+ (file.originalname.split('.')[0])  + path.extname(file.originalname);

            await sharp(file.buffer)
                .resize(640, 320)
                .toFormat("png")
                .png({ quality: 90 })
                .toFile(`uploads/${newFilename}`);
            req.body.productImg.push(newFilename);
            console.log(req.body.productImg);
        })
    );


    next();
};

const saveInDatabase = async (req, res, next) => {
}

const getResult = async (req, res, next) => {
    if (req.body.productImg.length <= 0) return next();

    const images = req.body.productImg
            .map(image => "" + image + "")
            .join("");

    return res.send(`Images were uploaded:${images}`);

    next();
};

export {
    uploadImages,
    resizeImages,
    getResult
};