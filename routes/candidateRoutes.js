const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// Create a new candidate
router.post('/', async (req, res) => {
  try {
    
    const candidate = await Candidate.create(req.body);
    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.findAll();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single candidate by id
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id);
    if (candidate) {
      res.json(candidate);
    } else {
      res.status(404).json({ error: 'Candidate not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a candidate
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Candidate.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCandidate = await Candidate.findByPk(req.params.id);
      res.json(updatedCandidate);
    } else {
      res.status(404).json({ error: 'Candidate not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a candidate
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Candidate.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Candidate not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;