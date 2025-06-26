// client/src/App.js
import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackCard from './components/FeedbackCard';
import HistoryList from './components/HistoryList';
import LoadingSpinner from './services/LoadingSpinner';
import ErrorMessage from './services/ErrorMessage';
import './App.css';

function App() {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('feedback');
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handleFeedbackReceived = (newFeedback) => {
    setFeedback(newFeedback);
    setRefreshHistory(prev => prev + 1);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setFeedback(null);
  };

  const clearError = () => {
    setError(null);
  };

  const clearFeedback = () => {
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            AI-Powered Feedback
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit your responses and get intelligent feedback to improve your thinking and communication skills.
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'feedback'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Get Feedback
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'history'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'feedback' && (
            <div className="space-y-8">
              {/* Feedback Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <FeedbackForm
                  onFeedbackReceived={handleFeedbackReceived}
                  onError={handleError}
                  onLoadingChange={setLoading}
                  onClearError={clearError}
                />
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center">
                  <LoadingSpinner />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <ErrorMessage 
                  message={error} 
                  onClose={clearError}
                />
              )}

              {/* Feedback Display */}
              {feedback && !loading && (
                <FeedbackCard 
                  feedback={feedback}
                  onClose={clearFeedback}
                />
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <HistoryList 
                refreshTrigger={refreshHistory}
                onError={handleError}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500">
          <p>&copy; 2024 AI-Powered Feedback App. Built with React & Node.js</p>
        </footer>
      </div>
    </div>
  );
}

export default App;