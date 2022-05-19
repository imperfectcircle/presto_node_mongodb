const express = require('express');

const { getProucts, getNewProuct, createNewProduct } = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get('/products', getProucts);

router.get('/products/new', getNewProuct);

router.post('/products', imageUploadMiddleware, createNewProduct);

module.exports = router;
