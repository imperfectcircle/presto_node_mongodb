import Router from 'express';

const router = Router();

router.get('/products', (req, res) => {
    res.render('customer/products/all-products');
});

export default router;
