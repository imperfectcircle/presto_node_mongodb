const User = require('../models/user.model');

const authUtil = require('../util/authentication');

const getSignup = (req, res) => {
    res.render('./customer/auth/signup');
};

const signup = async (req, res) => {
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.cap,
        req.body.city,
    );

    await user.signup();

    res.redirect('/login');
};

const getLogin = (req, res) => {
    res.render('./customer/auth/login');
};

const login = async (req, res) => {
    const user = new User(
        req.body.email,
        req.body.password,
    );
    const existingUser = await user.getUserWithSameEmail();

    if (!existingUser) {
        return res.redirect('/login');
    }

    const passworIsCorrect = await user.hasMatchingPassword(existingUser.password);

    if (!passworIsCorrect) {
        return res.redirect('/login');
    }

    authUtil.createUserSession(req, existingUser, () => {
        res.redirect('/');
    });

    return true;
};

const logout = (req, res) => {
    authUtil.destroyUserAuthSession(req);
    res.redirect('/');
};

module.exports = {
    getSignup,
    getLogin,
    signup,
    login,
    logout,
};
