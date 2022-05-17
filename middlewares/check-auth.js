const checkAuthStatus = (req, res, next) => {
    const { uid } = req.session;

    if (!uid) {
        return next();
    }

    res.locals.uid = uid;
    res.locals.isAuth = true;
    return next();
};

module.exports = checkAuthStatus;
