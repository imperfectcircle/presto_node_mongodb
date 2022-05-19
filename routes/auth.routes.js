const express = require('express');

const {
    getSignup,
    signup,
    getLogin,
    login,
    logout,
} = require('../controllers/auth.controller');

const router = express.Router();

router.get('/signup', getSignup);

router.post('/signup', signup);

router.get('/login', getLogin);

router.post('/login', login);

router.post('/logout', logout);

module.exports = router;
