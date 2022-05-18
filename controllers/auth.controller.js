const User = require('../models/user.model');

const authUtil = require('../util/authentication');
const { userDetailsAreValid, emailIsConfirmed, passwordIsConfirmed } = require('../util/validation');

const getSignup = (req, res) => {
    res.render('./customer/auth/signup');
};

const signup = async (req, res, next) => {
    if (!userDetailsAreValid(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.cap,
        req.body.city,
    ) || !emailIsConfirmed(
        req.body.email,
        req.body['confirm-email'],
    ) || !passwordIsConfirmed(
        req.body.password,
        req.body['confirm-password'],
    )) {
        res.redirect('/login');
        return;
    }

    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.cap,
        req.body.city,
    );

    try {
        const existAlready = await user.existAlready();

        if (existAlready) {
            res.redirect('/signup');
            return;
        }
        await user.signup();
    } catch (error) {
        next();
        return;
    }

    res.redirect('/login');
};

const getLogin = (req, res) => {
    res.render('./customer/auth/login');
};

const login = async (req, res, next) => {
    const user = new User(
        req.body.email,
        req.body.password,
    );

    let existingUser;

    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        return next();
    }

    if (!existingUser) {
        return res.redirect('/login');
    }

    let passworIsCorrect;

    try {
        passworIsCorrect = await user.hasMatchingPassword(existingUser.password);
    } catch (error) {
        return next();
    }

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
