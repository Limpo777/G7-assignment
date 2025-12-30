import mongoose from 'mongoose';
import Expense from '../models/Expense.js';

const getCurrentMonthRange = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
  return { start, end };
};

export const getMonthlySummary = async (req, res) => {
  try {
    const { start, end } = getCurrentMonthRange();

    const [summary, categoryBreakdown] = await Promise.all([
      Expense.aggregate([
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(req.userId),
            date: {
              $gte: start,
              $lte: end,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalSpent: { $sum: '$amount' },
            totalCount: { $sum: 1 },
          },
        },
      ]),
      Expense.aggregate([
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(req.userId),
            date: {
              $gte: start,
              $lte: end,
            },
          },
        },
        {
          $group: {
            _id: '$category',
            total: { $sum: '$amount' },
          },
        },
      ]),
    ]);

    const categoryMap = {};
    categoryBreakdown.forEach((item) => {
      categoryMap[item._id] = item.total;
    });

    const result = summary.length > 0 
      ? {
          totalSpent: summary[0].totalSpent,
          totalCount: summary[0].totalCount,
          categoryBreakdown: categoryMap,
        }
      : {
          totalSpent: 0,
          totalCount: 0,
          categoryBreakdown: {},
        };

    res.status(200).json({
      success: true,
      summary: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

