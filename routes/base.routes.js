import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('shared/index');
});

export default router;
