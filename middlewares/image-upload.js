const multer = require('multer');
const uuid = require('uuid').v4;

const upload = multer({
    storage: multer.diskStorage({
        destination: 'product-data/images',
        filename: (req, file, cb) => {
            const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);

            cb(null, `${uuid()}${ext}`);
        },
    }),
});

const configuredMulterMiddleware = upload.single('image');

module.exports = configuredMulterMiddleware;

