/**
 * Fonction simple qui vérifie si un utilisateur a le droit d'effectuer une action
 * basé sur son rôle et les rôles autorisés.
 * 
 * @param {string} userRole - Le rôle de l'utilisateur actuel
 * @param {Array} allowedRoles - Liste des rôles autorisés pour cette action
 * @returns {Object} - { allowed: boolean, message: string }
 */
function checkAccess(userRole, allowedRoles) {
  if (!userRole) {
    return {
      allowed: false,
      message: "Accès refusé: vous devez être connecté pour effectuer cette action"
    };
  }
  
  if (!allowedRoles.includes(userRole)) {
    return {
      allowed: false,
      message: `Accès refusé: votre rôle "${userRole}" n'a pas les droits nécessaires pour cette action`
    };
  }
  
  return {
    allowed: true,
    message: "Vous avez les droits nécessaires pour effectuer cette action"
  };
}

module.exports = checkAccess;