'use strict';

/**
 *
 * Error handling for 500 Server Errors
 * @param {object} error server error
 * @param {object} req api request object
 * @param {object} res api response object
 * @param {object} next
 */
module.exports = (err, req, res, next) => {
  let error = { error: err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};