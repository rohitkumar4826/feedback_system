// client/src/components/ErrorMessage.js
import React from 'react';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-start">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-red-500 text-xl">⚠️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{message}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600 font-bold text-lg"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;