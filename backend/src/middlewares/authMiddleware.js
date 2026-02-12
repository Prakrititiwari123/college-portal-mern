import jwt from 'jsonwebtoken';

// Middleware to verify JWT token and attach `req.user`
export const verifyToken = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // Attach minimal user info from token to request
        req.user = {
            userId: decoded.userId || decoded.id,
            email: decoded.email,
            role: decoded.role,
        };
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

// Middleware factory to restrict access by allowed roles
export const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No authenticated user' });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        next();
    };
};

// Decorator-like alias to be used in routes: RolesAllowed(['ADMIN'])
export const RolesAllowed = (roles) => verifyRole(Array.isArray(roles) ? roles : [roles]);
