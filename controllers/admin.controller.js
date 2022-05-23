/* eslint-disable import/extensions */
import logger from '../logger/logger.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        // console.log(products);
        res.render('admin/products/all-products', { products });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

const getNewProduct = (req, res) => {
    res.render('admin/products/new-product');
};

const createNewProduct = async (req, res, next) => {
    const product = new Product({
        ...req.body,
        image: req.file.filename,
    });

    try {
        await product.save();
    } catch (error) {
        logger.error(error);
        next(error);
        return;
    }

    res.redirect('/admin/products');
};

const getUpdateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('admin/products/update-product', { product });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    const product = new Product({
        ...req.body,
        _id: req.params.id,
    });

    if (req.file) {
        product.replaceImage(req.file.filename);
    }

    try {
        await product.save();
    } catch (error) {
        logger.error(error);
        next(error);
        return;
    }
    res.redirect('/admin/products');
};

const deleteProduct = async (req, res, next) => {
    let product;

    try {
        product = await Product.findById(req.params.id);
        await product.remove();
    } catch (error) {
        logger.error(error);
        next(error);
        return;
    }

    res.json({ message: 'Deleted product' });
};

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll();
        res.render('admin/orders/admin-orders', {
            orders,
        });
    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    const orderId = req.params.id;
    const { newStatus } = req.body;

    try {
        const order = await Order.findById(orderId);

        order.status = newStatus;

        await order.save();

        res.json({ message: 'Order updated', newStatus });
    } catch (error) {
        next(error);
    }
};

export {
    getProducts,
    getNewProduct,
    createNewProduct,
    getUpdateProduct,
    updateProduct,
    deleteProduct,
    getOrders,
    updateOrder,
};
