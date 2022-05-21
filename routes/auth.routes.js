/* eslint-disable import/extensions */
import Router from 'express';

import {
    getSignup,
    signup,
    getLogin,
    login,
    logout,
} from '../controllers/auth.controller.js';

const router = Router();

router.get('/signup', getSignup); // * /admin/signup

router.post('/signup', signup); // * /admin/signup

router.get('/login', getLogin); // * /admin/login

router.post('/login', login); // * /admin/login

router.post('/logout', logout); // * /admin/logout

export default router;
