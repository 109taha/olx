const path = require("path");
const multer = require("multer");

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "./uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(new Error("Only image are allowed!"));
    }
};

const upload = multer({
    storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: MAX_FILE_SIZE,
    }
});

module.exports = upload;