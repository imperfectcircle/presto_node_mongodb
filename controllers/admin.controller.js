/* eslint-disable import/extensions */
import logger from '../logger/logger.js';
import Product from '../models/product.model.js';

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

export {
    getProducts,
    getNewProduct,
    createNewProduct,
};
