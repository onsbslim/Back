const jwt = require('jsonwebtoken');

function checkRefresh(req, res, next) {
    const refreshToken = req.header('x-refresh-token');
  
    // Check for token
    if (!refreshToken)
      return res.status(401).json({ Error: 'No refresh token, authorizaton denied' });
  
    try {
      // Verify token
      const decoded = jwt.verify(refreshToken, process.env.SECRET);
      // Add user from payload
      req.company = decoded;
      next();
    } catch (e) {
      res.status(403).json({ Error: 'Refresh token is not valid' });
    }
  }
  
  module.exports = checkRefresh;