const jwt = require('jsonwebtoken');

// Secret key for signing JWTs (should be stored in an environment variable for production)

/**
 * Generates a JWT token
 */
function generateToken(user) {
  // The payload should contain claims you want to store in the token (e.g., user id)
  const payload = {
    userId: user.userId,
    email: user.email
  };

  // Set token expiration and algorithm
  const options = {
    expiresIn: '1h',  // 1 hour validity
    algorithm: 'HS256'
  };

  return jwt.sign(payload, process.env.NODE_SECRET_KEY, options);
}

/**
 * Verifies the token and returns the decoded payload
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.NODE_SECRET_KEY);
  } catch (error) {
    console.log('Token verification failed:', error);
    return null;
  }
}

module.exports = { generateToken, verifyToken };
