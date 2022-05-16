const getSignup = (req, res) => {
    res.render('./customer/auth/signup');
};

const getLogin = (req, res) => {
    res.render('./customer/auth/login');
};

module.exports = {
    getSignup,
    getLogin,
};
