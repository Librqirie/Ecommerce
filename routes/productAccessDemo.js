const express = require('express');
const router = express.Router();
const checkAccess = require('../utils/checkAccess');

// Route de démonstration pour tester les permissions
router.post('/check-access', (req, res) => {
  // Dans un cas réel, ces valeurs viendraient de l'authentification JWT
  // Pour ce test simple, on les prend directement du body de la requête
  const { userRole, actionType } = req.body;
  
  // Définir les rôles autorisés selon l'action
  let allowedRoles;
  
  switch (actionType) {
    case 'createProduct':
      allowedRoles = ["Super Administrateur", "Administrateur", "Vendeur"];
      break;
    case 'deleteProduct':
      allowedRoles = ["Super Administrateur", "Administrateur"];
      break;
    case 'viewOrdersReport':
      allowedRoles = ["Super Administrateur", "Administrateur", "Gestionnaire de Commandes"];
      break;
    default:
      return res.status(400).json({ message: "Type d'action inconnu" });
  }
  
  // Vérifier l'accès
  const accessCheck = checkAccess(userRole, allowedRoles);
  
  // Renvoyer le résultat
  return res.status(accessCheck.allowed ? 200 : 403).json({
    actionType,
    userRole,
    result: accessCheck
  });
});

module.exports = router;