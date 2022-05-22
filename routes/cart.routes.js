/* eslint-disable import/extensions */
import Router from 'express';

import {
    addCartItem,
    getCart,
} from '../controllers/cart.controller.js';

const router = Router();

router.get('/', getCart); // * /cart/

router.post('/items', addCartItem); // * /cart/items

export default router;
