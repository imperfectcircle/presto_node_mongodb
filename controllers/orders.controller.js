/* eslint-disable import/extensions */
import logger from '../logger/logger.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';

const getOrders = (req, res) => {
    res.render('customer/orders/all-orders');
};

const addOrder = async (req, res, next) => {
    const { cart } = res.locals;

    let userDocument;
    try {
        userDocument = await User.findById(res.locals.uid);
    } catch (error) {
        logger.error(error);
        return next(error);
    }

    const order = new Order(cart, userDocument);

    try {
        order.save();
    } catch (error) {
        logger.error(error);
        return next(error);
    }

    req.session.cart = null;

    res.redirect('/orders');
};

export {
    getOrders,
    addOrder,
};
