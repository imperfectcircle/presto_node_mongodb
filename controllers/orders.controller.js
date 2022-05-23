/* eslint-disable import/extensions */
import Stripe from 'stripe';
import logger from '../logger/logger.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';

const stripe = new Stripe(process.env.STRIPE_API_PRIVATE_KEY);

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAllForUser(res.locals.uid);
        res.render('customer/orders/all-orders', {
            orders,
        });
    } catch (error) {
        next(error);
    }
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

    const session = await stripe.checkout.sessions.create({
        // eslint-disable-next-line arrow-body-style
        line_items: cart.items.map((item) => {
            return {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.product.title,
                    },
                    unit_amount: +item.product.price.toFixed(2) * 100,
                },
                quantity: item.quantity,
            };
        }),
        mode: 'payment',
        success_url: `${process.env.HOST}/orders/success`,
        cancel_url: `${process.env.HOST}/orders/failure`,
    });

    return res.redirect(303, session.url);
};

const getSuccess = (req, res) => {
    res.render('customer/orders/success');
};

const getFailure = (req, res) => {
    res.render('customer/orders/failure');
};

export {
    getOrders,
    addOrder,
    getSuccess,
    getFailure,
};
