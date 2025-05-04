const express = require('express');
const router = express.Router();
const BookedSlot = require('../models/bookedSlot');
const Engineer = require('../models/engineer');
const Candidate = require('../models/candidate');

// Book a new slot
router.post('/', async (req, res) => {
  try {
    const { engineerId, candidateId, date, day, time } = req.body;
    
    // Check if engineer and candidate exist
    const engineer = await Engineer.findByPk(engineerId);
    const candidate = await Candidate.findByPk(candidateId);
    
    if (!engineer || !candidate) {
      return res.status(404).json({ error: 'Engineer or Candidate not found' });
    }
    
    // Check if slot is already booked
    const existingSlot = await BookedSlot.findOne({
      where: { engineerId, date, time }
    });
    
    if (existingSlot) {
      return res.status(400).json({ error: 'Slot already booked' });
    }
    
    const bookedSlot = await BookedSlot.create({
      engineerId,
      candidateId,
      date,
      day,
      time
    });
    
    res.status(201).json(bookedSlot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all booked slots
router.get('/', async (req, res) => {
  try {
    const bookedSlots = await BookedSlot.findAll({
      include: [
        { model: Engineer, attributes: ['id', 'name', 'email'] },
        { model: Candidate, attributes: ['id', 'name', 'email'] }
      ]
    });
    res.json(bookedSlots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get slots by engineer ID
router.get('/engineer/:engineerId', async (req, res) => {
  try {
    const slots = await BookedSlot.findAll({
      where: { engineerId: req.params.engineerId },
      include: [{ model: Candidate, attributes: ['id', 'name', 'email'] }]
    });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get slots by candidate ID
router.get('/candidate/:candidateId', async (req, res) => {
  try {
    const slots = await BookedSlot.findAll({
      where: { candidateId: req.params.candidateId },
      include: [{ model: Engineer, attributes: ['id', 'name', 'email'] }]
    });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update slot status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const [updated] = await BookedSlot.update(
      { status },
      { where: { id: req.params.id } }
    );
    
    if (updated) {
      const updatedSlot = await BookedSlot.findByPk(req.params.id);
      res.json(updatedSlot);
    } else {
      res.status(404).json({ error: 'Slot not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a slot
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await BookedSlot.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Slot not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;