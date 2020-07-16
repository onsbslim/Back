
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
  
    // Check for token
    if (!token)
      return res.status(401).json({ Error: 'No token, authorizaton denied' });
  
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.KEY);
      // Add user from payload
      req.company = decoded;
      next();
    } catch (e) {
      res.status(403).json({ Error: 'Token is not valid' });
    }
  }
  
  module.exports = auth;