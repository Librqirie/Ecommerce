const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

// Récupérer tous les logs
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().populate('user');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter un log
router.post('/', async (req, res) => {
  try {
    const newLog = new Log(req.body);
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Mettre à jour un log par ID
router.put('/:id', async (req, res) => {
  try {
    const updatedLog = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Supprimer un log par ID
router.delete('/:id', async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id);
    res.json({ message: 'Log supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;