/* eslint-disable import/extensions */
import Router from 'express';

import {
    addCartItem,
} from '../controllers/cart.controller.js';

const router = Router();

router.post('/items', addCartItem); // * /cart/items

export default router;
