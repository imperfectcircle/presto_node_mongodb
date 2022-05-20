/* eslint-disable import/extensions */
import express from 'express';

import { getProducts, getNewProduct, createNewProduct } from '../controllers/admin.controller.js';
import imageUploadMiddleware from '../middlewares/image-upload.js';

const router = express.Router();

router.get('/products', getProducts);

router.get('/products/new', getNewProduct);

router.post('/products', imageUploadMiddleware, createNewProduct);

export default router;
