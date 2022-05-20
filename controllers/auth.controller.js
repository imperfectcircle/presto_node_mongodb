/* eslint-disable quotes */
/* eslint-disable import/extensions */
import User from '../models/user.model.js';

import authUtil from '../util/authentication.js';
import { userDetailsAreValid, emailIsConfirmed, passwordIsConfirmed } from '../util/validation.js';
import { getSessionData, flashDataToSession } from '../util/session-flash.js';

const getSignup = (req, res) => {
    let sessionData = getSessionData(req);

    if (!sessionData) {
        sessionData = {
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
            fullname: '',
            streer: '',
            cap: '',
            city: '',
        };
    }

    res.render('./customer/auth/signup', { inputData: sessionData });
};

const signup = async (req, res, next) => {
    const enteredData = {
        email: req.body.email,
        confirmEmail: req.body['confirm-email'],
        password: req.body.password,
        confirmPassword: req.body['confirm-password'],
        fullname: req.body.fullname,
        street: req.body.street,
        cap: req.body.cap,
        city: req.body.city,
    };

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
        flashDataToSession(req, {
            errorMessage: 'Controlla i dati inseriti',
            ...enteredData,
        }, () => {
            res.redirect('/signup');
        });
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
            flashDataToSession(req, {
                errorMessage: `Un utente con l'indirizzo email ${req.body.email} esiste già.`,
                ...enteredData,
            }, () => {
                res.redirect('/signup');
            });
            return;
        }

        await user.signup();
    } catch (error) {
        next(error);
        return;
    }

    res.redirect('/login');
};

const getLogin = (req, res) => {
    let sessionData = getSessionData(req);

    if (!sessionData) {
        sessionData = {
            email: '',
            password: '',
        };
    }

    res.render('./customer/auth/login', { inputData: sessionData });
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
        next(error);
        return;
    }

    const sessionErrorData = {
        errorMessage: `L'indirizzo email inserito o la password non sono corretti - prova di nuovo.`,
        email: user.email,
        password: user.password,
    };

    if (!existingUser) {
        flashDataToSession(req, sessionErrorData, () => {
            res.redirect('/login');
        });
        return;
    }

    let passworIsCorrect;

    try {
        passworIsCorrect = await user.hasMatchingPassword(existingUser.password);
    } catch (error) {
        next(error);
        return;
    }

    if (!passworIsCorrect) {
        flashDataToSession(req, sessionErrorData, () => {
            res.redirect('/login');
        });
        return;
    }

    authUtil.createUserSession(req, existingUser, () => {
        res.redirect('/');
    });
};

const logout = (req, res) => {
    authUtil.destroyUserAuthSession(req);
    res.redirect('/');
};

export {
    getSignup,
    getLogin,
    signup,
    login,
    logout,
};
