/* eslint-disable import/extensions */
import express from 'express';

import { getProucts, getNewProuct, createNewProduct } from '../controllers/admin.controller.js';
import imageUploadMiddleware from '../middlewares/image-upload.js';

const router = express.Router();

router.get('/products', getProucts);

router.get('/products/new', getNewProuct);

router.post('/products', imageUploadMiddleware, createNewProduct);

export default router;
