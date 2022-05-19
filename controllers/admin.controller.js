const getProucts = (req, res) => {
    res.render('admin/products/all-products');
};

const getNewProuct = (req, res) => {
    res.render('admin/products/new-product');
};

const createNewProduct = (req, res) => {
    console.log(req.body);
    console.log(req.file);

    res.redirect('/admin/products');
};

module.exports = {
    getProucts,
    getNewProuct,
    createNewProduct,
};
