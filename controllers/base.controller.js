const getHome = (req, res) => res.render('shared/index');

const get401 = (req, res) => res.status(401).render('shared/401');

const get403 = (req, res) => res.status(403).render('shared/403');

export {
    getHome,
    get401,
    get403,
};
