const jwt = require('jsonwebtoken');

// Clé secrète pour signer les tokens (à mettre dans un .env en production)
const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt';

// Générer un token JWT avec l'ID et le rôle de l'utilisateur
exports.generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '24h' });
};

// Vérifier un token JWT
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Extraire le token de l'en-tête Authorization
exports.extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};