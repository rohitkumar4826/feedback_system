// client/src/components/FeedbackForm.js
import React, { useState } from 'react';
import { submitFeedback } from '../services/api';

const FeedbackForm = ({ onFeedbackReceived, onError, onLoadingChange, onClearError }) => {
  const [userInput, setUserInput] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    setCharCount(value.length);
    if (onClearError) onClearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      onError('Please enter your response before submitting.');
      return;
    }

    if (userInput.trim().length < 10) {
      onError('Please enter at least 10 characters for meaningful feedback.');
      return;
    }

    try {
      onLoadingChange(true);
      const response = await submitFeedback(userInput.trim());
      onFeedbackReceived(response.data);
      setUserInput('');
      setCharCount(0);
    } catch (error) {
      onError(error.response?.data?.message || 'Failed to get feedback. Please try again.');
    } finally {
      onLoadingChange(false);
    }
  };

  const isValid = userInput.trim().length >= 10;
  const isNearLimit = charCount > 1800;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="userInput" className="block text-lg font-semibold text-gray-700 mb-3">
          Your Response
        </label>
        <textarea
          id="userInput"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter your response here... (minimum 10 characters)"
          className={`w-full p-4 border-2 rounded-lg resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isNearLimit 
              ? 'border-orange-300 focus:border-orange-500' 
              : 'border-gray-300 focus:border-blue-500'
          }`}
          rows="6"
          maxLength={2000}
        />
        <div className="flex justify-between items-center mt-2">
          <span className={`text-sm ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
            {isValid ? '✓ Ready for feedback' : 'Minimum 10 characters required'}
          </span>
          <span className={`text-sm ${isNearLimit ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
            {charCount}/2000
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
          isValid
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Get Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;