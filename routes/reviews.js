const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Récupérer tous les avis
router.get('/', async (req, res) => {
  try {
    // Populate pour récupérer les données liées à l'utilisateur et au produit
    const reviews = await Review.find().populate('user').populate('product');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter un avis
router.post('/', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Mettre à jour un avis par ID
router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Supprimer un avis par ID
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Avis supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;