import express from 'express';
import dss from './dss';

const router = express.Router();
router.use('/dss', dss);
export default router;
