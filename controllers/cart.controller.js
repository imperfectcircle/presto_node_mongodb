/* eslint-disable import/extensions */
import logger from '../logger/logger.js';
import Product from '../models/product.model.js';

const getCart = (req, res) => {
    res.render('customer/cart/cart');
};

const addCartItem = async (req, res, next) => {
    let product;

    try {
        product = await Product.findById(req.body.productId);
    } catch (error) {
        logger.error(error);
        next(error);
        return;
    }

    const { cart } = res.locals;
    cart.addItem(product);
    req.session.cart = cart;

    res.status(201).json({
        message: 'Carrello aggiornato',
        newTotalItems: cart.totalQuantity,
    });
};

const updateCartItem = (req, res) => {
    const { cart } = res.locals;

    const updatedItemData = cart.updateItem(req.body.productId, +req.body.quantity);

    req.session.cart = cart;

    res.json({
        message: 'Item updated!',
        updatedCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice,
        },
    });
};

export { getCart, addCartItem, updateCartItem };
