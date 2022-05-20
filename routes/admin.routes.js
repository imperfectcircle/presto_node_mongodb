/* eslint-disable import/extensions */
import Router from 'express';

import {
    getProducts,
    getNewProduct,
    createNewProduct,
    getUpdateProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/admin.controller.js';

import imageUploadMiddleware from '../middlewares/image-upload.js';

const router = Router();
// * nelle rotte /admin viene omesso. Vedere middleware della rotta in app.js
router.get('/products', getProducts);

router.get('/products/new', getNewProduct);

router.post('/products', imageUploadMiddleware, createNewProduct);

router.get('/products/:id', getUpdateProduct);

router.post('/products/:id', imageUploadMiddleware, updateProduct);

router.delete('/products/:id', deleteProduct);

export default router;
