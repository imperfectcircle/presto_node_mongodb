/* eslint-disable import/extensions */
import logger from '../logger/logger.js';
import Product from '../models/product.model.js';

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.render('customer/products/all-products', { products });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

const getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('customer/products/product-details', { product });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export {
    getAllProducts,
    getProductDetails,
};
