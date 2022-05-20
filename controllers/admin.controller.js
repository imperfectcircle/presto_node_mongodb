/* eslint-disable import/extensions */
import logger from '../logger/logger.js';
import Product from '../models/poduct.model.js';

const getProucts = (req, res) => {
    res.render('admin/products/all-products');
};

const getNewProuct = (req, res) => {
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
        next();
        return;
    }

    res.redirect('/admin/products');
};

export {
    getProucts,
    getNewProuct,
    createNewProduct,
};
