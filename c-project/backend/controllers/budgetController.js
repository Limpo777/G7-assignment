import mongoose from 'mongoose';
import Budget from '../models/Budget.js';

const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const createOrUpdateBudget = async (req, res) => {
  try {
    const { amount } = req.body;

    if (amount === undefined || amount < 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid budget amount',
      });
    }

    const month = getCurrentMonth();
    const userId = new mongoose.Types.ObjectId(req.userId);

    const budget = await Budget.findOneAndUpdate(
      {
        user_id: userId,
        month,
      },
      {
        user_id: userId,
        month,
        amount: parseFloat(amount),
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Budget updated successfully',
      budget,
    });
  } catch (error) {
    console.error('Budget update error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

export const getCurrentBudget = async (req, res) => {
  try {
    const month = getCurrentMonth();
    const userId = new mongoose.Types.ObjectId(req.userId);

    const budget = await Budget.findOne({
      user_id: userId,
      month,
    });

    if (!budget) {
      return res.status(200).json({
        success: true,
        budget: {
          amount: 0,
          month,
        },
      });
    }

    res.status(200).json({
      success: true,
      budget,
    });
  } catch (error) {
    console.error('Budget fetch error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

