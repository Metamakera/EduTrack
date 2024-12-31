const express = require('express');
const Teacher = require('../models/Teacher'); // Adjust the path to your Teacher model
const router = express.Router();

// POST route to add a new teacher
router.post('/', async (req, res) => {
  const { teacher_id, name, subject, contact_info, address } = req.body;

  if (!teacher_id || !name || !subject || !contact_info || !address) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const newTeacher = new Teacher({
      teacher_id,
      name,
      subject,
      contact_info,
      address
    });

    await newTeacher.save();
    res.status(201).json(newTeacher); // Respond with the newly added teacher
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).send('Failed to add teacher. Please try again');
  }
});

// GET route to fetch all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers); // Respond with the list of teachers
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).send('Failed to fetch teachers');
  }
});

// GET route to fetch a single teacher by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).send('Teacher not found');
    }
    res.status(200).json(teacher); // Respond with the teacher data
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).send('Failed to fetch teacher');
  }
});

// PUT route to update a teacher's details
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { teacher_id, name, subject, contact_info, address } = req.body;

  if (!teacher_id || !name || !subject || !contact_info || !address) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { teacher_id, name, subject, contact_info, address },
      { new: true } // Return the updated teacher object
    );

    if (!updatedTeacher) {
      return res.status(404).send('Teacher not found');
    }

    res.status(200).json(updatedTeacher); // Respond with the updated teacher
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).send('Failed to update teacher');
  }
});

// DELETE route to remove a teacher
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).send('Teacher not found');
    }

    res.status(200).send('Teacher removed successfully');
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).send('Failed to delete teacher');
  }
});

module.exports = router;
