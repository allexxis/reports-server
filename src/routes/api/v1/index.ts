import express from 'express';
import fdk from './fdk';
import reports from './reports';

const router = express.Router();

router.use('/fdk', fdk);
router.use('/reports', reports);

export default router;
