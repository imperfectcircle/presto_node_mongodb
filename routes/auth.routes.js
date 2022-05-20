/* eslint-disable import/extensions */
import express from 'express';

import {
    getSignup,
    signup,
    getLogin,
    login,
    logout,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/signup', getSignup);

router.post('/signup', signup);

router.get('/login', getLogin);

router.post('/login', login);

router.post('/logout', logout);

export default router;
