// error.js
const errorHandler = (err, req, res, next) => {
  if (!err.status) {
    console.error(err.stack);
    res.status(500).send('Server error');
  } else {
    res.status(err.status).send(err.message);
  }
};

module.exports = errorHandler;
