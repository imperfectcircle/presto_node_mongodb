// eslint-disable-next-line import/extensions
import Cart from '../models/cart.model.js';

const initializeCart = (req, res, next) => {
    let cart;

    if (!req.session.cart) {
        cart = new Cart();
    } else {
        const sessionCart = req.session.cart;
        cart = new Cart(
            sessionCart.items,
            sessionCart.totalQuantity,
            sessionCart.totalPrice,
        );
    }

    res.locals.cart = cart;
    next();
};

export default initializeCart;
