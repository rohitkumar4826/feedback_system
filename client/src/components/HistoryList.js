// client/src/components/HistoryList.js
import React, { useState, useEffect } from 'react';
import { getHistory, deleteFeedback } from '../services/api';
import LoadingSpinner from '../services/LoadingSpinner';

const HistoryList = ({ refreshTrigger, onError }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchHistory(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger, currentPage]);

  const fetchHistory = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getHistory(page);
      setHistory(response.data);
      setPagination(response.pagination);
    } catch (error) {
      onError('Failed to load history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    try {
      await deleteFeedback(id);
      setHistory(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      onError('Failed to delete feedback. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No feedback history yet</h3>
        <p className="text-gray-500">Submit your first response to see it here!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Feedback History</h2>

      <div className="space-y-6">
        {history.map((item) => (
          <div key={item._id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm text-gray-500">{formatDate(item.timestamp)}</span>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-400 hover:text-red-600 text-sm font-medium"
              >
                Delete
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Your Response:</h4>
                <p className="text-gray-600 bg-white p-3 rounded border-l-4 border-blue-500">
                  {item.userInput}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">AI Feedback:</h4>
                <p className="text-gray-600 bg-white p-3 rounded border-l-4 border-green-500">
                  {item.feedback}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={!pagination.hasPrev}
            className={`px-4 py-2 rounded-lg font-medium ${
              pagination.hasPrev
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Previous
          </button>

          <span className="text-gray-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={!pagination.hasNext}
            className={`px-4 py-2 rounded-lg font-medium ${
              pagination.hasNext
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
