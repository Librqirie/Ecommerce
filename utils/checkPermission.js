const { verifyToken, extractToken } = require('./jwtAuth');

/**
 * Vérifie si l'utilisateur a le droit d'effectuer une action
 * @param {Object} req - Requête Express
 * @param {Array} allowedRoles - Tableau des rôles autorisés
 * @returns {Object} Résultat de la vérification { allowed: boolean, message: string }
 */
function checkPermission(req, allowedRoles) {
  const token = extractToken(req);
  
  // Pas de token trouvé
  if (!token) {
    return {
      allowed: false,
      message: "Accès refusé: vous devez être connecté pour effectuer cette action"
    };
  }
  
  // Vérifier le token
  const decoded = verifyToken(token);
  if (!decoded) {
    return {
      allowed: false,
      message: "Accès refusé: token invalide ou expiré"
    };
  }
  
  // Vérifier le rôle
  if (!allowedRoles.includes(decoded.role)) {
    return {
      allowed: false,
      message: `Accès refusé: votre rôle "${decoded.role}" n'a pas les droits nécessaires pour cette action`
    };
  }
  
  // Tout est bon
  return {
    allowed: true,
    message: "Vous avez les droits nécessaires pour effectuer cette action",
    user: decoded
  };
}

module.exports = checkPermission;