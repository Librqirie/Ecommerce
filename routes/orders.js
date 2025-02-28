const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Récupérer toutes les commandes
router.get('/', async (req, res) => {
  try {
    // Utilisation de populate pour récupérer les données liées à l'utilisateur et aux produits
    const orders = await Order.find().populate('user').populate('products');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter une commande
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Mettre à jour une commande par ID
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Supprimer une commande par ID
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Commande supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;