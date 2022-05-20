import Router from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('shared/index');
});

export default router;
