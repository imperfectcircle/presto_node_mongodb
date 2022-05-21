/* eslint-disable import/extensions */
import Router from 'express';

import { getAllProducts, getProductDetails} from '../controllers/products.controller.js';

const router = Router();

router.get('/products', getAllProducts);

router.get('/products/:id', getProductDetails);

export default router;
