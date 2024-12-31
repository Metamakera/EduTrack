
const mongoose = require('mongoose');
const Event = require('../models/Event');

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Add a new event
const addEvent = async (req, res) => {
  const { name, date, location } = req.body;

  if (!name || !date || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newEvent = new Event({ name, date, location });
    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully!', data: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error adding event', error });
  }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;
  
    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }
  
    try {
      const event = await Event.findByIdAndDelete(id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
  };

module.exports = { getEvents, addEvent, deleteEvent };
