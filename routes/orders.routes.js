/* eslint-disable import/extensions */
import Router from 'express';

import {
    getOrders, addOrder,
} from '../controllers/orders.controller.js';

const router = Router();

router.get('/', getOrders); // * /orders/

router.post('/', addOrder); // * /orders/

export default router;
