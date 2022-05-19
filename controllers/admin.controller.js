const getProucts = (req, res) => {
    res.render('admin/products/all-products');
};

const getNewProuct = (req, res) => {
    res.render('admin/products/new-product');
};

const createNewProduct = (req, res) => {

};

module.exports = {
    getProucts,
    getNewProuct,
    createNewProduct,
};
