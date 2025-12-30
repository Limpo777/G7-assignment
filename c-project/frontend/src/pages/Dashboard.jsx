import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { summaryAPI, budgetAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [summaryData, budgetData] = await Promise.all([
        summaryAPI.getMonthly(),
        budgetAPI.getCurrent(),
      ]);
      setSummary(summaryData);
      setBudget(budgetData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = summary?.totalSpent || 0;
  const budgetAmount = budget?.amount || 0;
  const remaining = budgetAmount - totalSpent;
  const isOverBudget = remaining < 0;

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 sm:px-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your spending and manage your budget</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <span className="font-medium">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
          <div className="card">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="text-3xl font-bold text-indigo-600">
                    ${totalSpent.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-600">Total Spent This Month</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="text-3xl font-bold text-purple-600">
                    ${budgetAmount.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-600">Monthly Budget</p>
              </div>
            </div>
          </div>

          <div className={`card ${isOverBudget ? 'border-2 border-red-300' : ''}`}>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`text-3xl font-bold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                    ${Math.abs(remaining).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-600">
                  {isOverBudget ? 'Over Budget' : 'Remaining Budget'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {isOverBudget && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Warning:</strong> You have exceeded your monthly budget by ${Math.abs(remaining).toFixed(2)}.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => navigate('/expenses/add')}
            className="btn-primary"
          >
            Add New Expense
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

