import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMonthlySummary } from '../controllers/summaryController.js';

const router = express.Router();

router.use(protect);

router.get('/monthly', getMonthlySummary);

export default router;

