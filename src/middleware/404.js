'use strict';

/**
 *
 * Error handling for invalid routes
 * @param {object} req api request object
 * @param {object} res api response object
 * @param {object} next
 */
module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};