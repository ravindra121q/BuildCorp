import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-trade-analytics-key-2026';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token is missing or invalid' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token is expired or invalid' });
    }
    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role
    };
    next();
  });
}

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '8h' }
  );
}

export function requireRole(roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Unauthorized: insufficient permissions' });
    }
    next();
  };
}
