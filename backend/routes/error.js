// error.js
module.exports = (err, req, res, next) => {
  console.error('Error message:', err.message);
  console.error('Error stack:', err.stack);

  if (err.response) {
    console.error('Error response data:', err.response.data);
    console.error('Error response status:', err.response.status);
    console.error('Error response headers:', err.response.headers);
  }

  const statusCode = err.status || 500;
  const response = {
    status: 'error',
    message: err.message || 'Internal Server Error',
  };

  res.status(statusCode).json(response);
};
