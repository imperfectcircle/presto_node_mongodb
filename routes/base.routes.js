/* eslint-disable import/extensions */
import Router from 'express';

import { getHome, get401, get403 } from '../controllers/base.controller.js';

const router = Router();

router.get('/', getHome);

router.get('/401', get401);

router.get('/403', get403);

export default router;
