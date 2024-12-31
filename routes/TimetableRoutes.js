const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

// Get timetable by student ID
router.get('/:studentId', async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ studentId: req.params.studentId });
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update timetable
router.put('/:studentId', async (req, res) => {
  try {
    const updatedTimetable = await Timetable.findOneAndUpdate(
      { studentId: req.params.studentId },
      req.body,
      { new: true, upsert: true }
    );
    res.json(updatedTimetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
