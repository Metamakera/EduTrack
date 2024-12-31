const express = require('express');
const router = express.Router();
const { getEvents, addEvent, deleteEvent } = require('../controllers/eventController');

// Get all events
router.get('/', getEvents);

// Add a new event
router.post('/', addEvent);

// Delete an event by ID
router.delete('/:id', deleteEvent);

module.exports = router;
