const FeedbackCard = ({ feedback, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-8 border border-green-200">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="text-green-500 mr-2">🤖</span>
          AI Feedback
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            aria-label="Close feedback"
          >
            ×
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Response:</h3>
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-700 leading-relaxed">{feedback.userInput}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Feedback:</h3>
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
            <p className="text-gray-700 leading-relaxed">{feedback.feedback}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-sm text-gray-500">
            Generated on {formatDate(feedback.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
