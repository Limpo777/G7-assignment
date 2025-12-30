import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { budgetAPI, summaryAPI } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Budget = () => {
  const [budget, setBudget] = useState(null);
  const [summary, setSummary] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [budgetData, summaryData] = await Promise.all([
        budgetAPI.getCurrent(),
        summaryAPI.getMonthly(),
      ]);
      setBudget(budgetData);
      setSummary(summaryData);
      if (budgetData?.amount) {
        setFormData({ amount: budgetData.amount.toString() });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load budget data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const data = {
        amount: parseFloat(formData.amount),
      };
      await budgetAPI.createOrUpdate(data);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update budget');
    } finally {
      setSubmitting(false);
    }
  };

  const budgetAmount = budget?.amount || 0;
  const totalSpent = summary?.totalSpent || 0;
  const remaining = budgetAmount - totalSpent;

  const chartData = [
    { name: 'Spent', value: totalSpent },
    { name: 'Remaining', value: Math.max(0, remaining) },
  ];

  const COLORS = ['#ef4444', '#10b981'];

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Budget Management</h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Set Monthly Budget</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Budget Amount ($)
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    required
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleChange}
                    className="input-with-dollar w-full"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Updating...' : 'Update Budget'}
              </button>
            </form>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Budget Amount</p>
                <p className="text-2xl font-bold text-gray-900">${budgetAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount Spent</p>
                <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {remaining >= 0 ? 'Remaining' : 'Over Budget'}
                </p>
                <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(remaining).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {budgetAmount > 0 && (
          <div className="mt-6 card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Visualization</h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Spending vs Remaining</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Budget Breakdown</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Budget;

