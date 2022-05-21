const getHome = (req, res) => res.render('shared/index');

const get401 = (req, res) => res.status(401).render('shared/401');

const get403 = (req, res) => res.status(403).render('shared/403');

const get404 = (req, res) => res.status(404).render('shared/404');

export {
    getHome,
    get401,
    get403,
    get404,
};
