/* eslint-disable import/extensions */
import Router from 'express';

import {
    getOrders,
    addOrder,
    getSuccess,
    getFailure,
} from '../controllers/orders.controller.js';

const router = Router();

router.get('/', getOrders); // * /orders/

router.post('/', addOrder); // * /orders/

router.get('/success', getSuccess); // * /orders/success

router.get('/failure', getFailure); // * /orders/failure

export default router;
