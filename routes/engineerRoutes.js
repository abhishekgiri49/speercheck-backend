const express = require("express");
const router = express.Router();
const Engineer = require("../models/engineer");
const BookedSlot = require("../models/bookedSlot");

// Create a new engineer
router.post("/", async (req, res) => {
  try {
    const engineer = await Engineer.create(req.body);
    res.status(201).json(engineer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all engineers
router.get("/", async (req, res) => {
  try {
    const engineers = await Engineer.findAll();
    const engineersWithSlots = await Promise.all(
      engineers.map(async (engineer) => {
        const bookedSlots = await BookedSlot.findAll({
          where: { engineerId: engineer.id },
        });
        return {
          ...engineer.toJSON(),
          bookedSlots,
        };
      })
    );
    res.json(engineersWithSlots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single engineer by id
router.get("/:id", async (req, res) => {
  try {
    const engineer = await Engineer.findByPk(req.params.id);
    if (engineer) {
      res.json(engineer);
    } else {
      res.status(404).json({ error: "Engineer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an engineer
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Engineer.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedEngineer = await Engineer.findByPk(req.params.id);
      res.json(updatedEngineer);
    } else {
      res.status(404).json({ error: "Engineer not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an engineer
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Engineer.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Engineer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
