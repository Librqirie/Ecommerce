const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../utils/jwtAuth');

// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (userExists) {
      return res.status(400).json({ 
        message: "Un utilisateur avec cet email ou ce nom d'utilisateur existe déjà" 
      });
    }
    
    // Créer un nouvel utilisateur
    const user = await User.create({
      username,
      email,
      password, // Mot de passe en clair pour cet exemple simple
      role: role || "Client" // Par défaut, assigner le rôle "Client"
    });
    
    // Générer un token JWT pour l'utilisateur nouvellement créé
    const token = generateToken(user._id, user.role);
    
    // Renvoyer la réponse
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Trouver l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
    
    // Vérifier le mot de passe (simple comparaison directe pour cet exemple)
    // En production, utilisez une méthode de hachage appropriée
    if (user.password !== password) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
    
    // Générer un token JWT
    const token = generateToken(user._id, user.role);
    
    // Renvoyer le token et les infos utilisateur
    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});

module.exports = router;