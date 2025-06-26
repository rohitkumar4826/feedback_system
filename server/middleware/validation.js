// server/middleware/validation.js
const validateInput = (req, res, next) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({
      success: false,
      message: 'User input is required'
    });
  }

  if (typeof userInput !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'User input must be a string'
    });
  }

  if (userInput.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Input must be at least 10 characters long'
    });
  }

  if (userInput.length > 2000) {
    return res.status(400).json({
      success: false,
      message: 'Input cannot exceed 2000 characters'
    });
  }

  // Sanitize input
  req.body.userInput = userInput.trim();
  next();
};

module.exports = { validateInput };