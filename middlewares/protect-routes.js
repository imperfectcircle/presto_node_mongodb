const protectRoutes = (req, res, next) => {
    if (!res.locals.isAuth && req.path.startsWith('/orders')) {
        return res.redirect('/401');
    }

    if (req.path.startsWith('/admin') && !res.locals.isAdmin) {
        return res.redirect('/403');
    }

    return next();
};

export default protectRoutes;
