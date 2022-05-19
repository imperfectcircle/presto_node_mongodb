const express = require('express');

const { getProucts, getNewProuct, createNewProduct } = require('../controllers/admin.controller');

const router = express.Router();

router.get('/products', getProucts);

router.get('/products/new', getNewProuct);

module.exports = router;
