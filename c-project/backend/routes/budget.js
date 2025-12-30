import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createOrUpdateBudget,
  getCurrentBudget,
} from '../controllers/budgetController.js';

const router = express.Router();

router.use(protect);

router.post('/', createOrUpdateBudget);
router.get('/current', getCurrentBudget);

export default router;

