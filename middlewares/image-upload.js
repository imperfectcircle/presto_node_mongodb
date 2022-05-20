import multer from 'multer';
import { v4 as uuid } from 'uuid';

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

export default configuredMulterMiddleware;
