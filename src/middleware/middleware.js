const jwt = require('jsonwebtoken');
const { errorResponse } = require('../helper');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return errorResponse(res, 401, 'Unauthorized: No token provided');
    }

    try {
        // Clean the token string
        const cleanedToken = token.replace('Bearer ', '').trim();
        const secret = process.env.NODE_SECRET_KEY;

        if (!secret) {
            console.error('NODE_SECRET_KEY is not set');
            return errorResponse(res, 500, 'Internal server error');
        }

        // Decode and verify the token
        const decoded = jwt.verify(cleanedToken, secret);
        console.log('Decoded Token:', decoded);

        if (!decoded.id) {
            throw new Error('User ID not found in token payload');
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Token verification failed:', {
            message: error.message,
            stack: error.stack,
            token: token
        });
        return errorResponse(res, 401, 'Unauthorized: Invalid token');
    }
};

module.exports = {
    verifyToken
};
