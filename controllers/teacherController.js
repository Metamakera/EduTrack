const bcrypt = require('bcrypt');
const Teacher = require('../models/Teacher'); // Use Teacher model for data-related operations
const Teacherlog = require('../models/Teacherlog'); // Use Teacherlog model for login operations

// Get all teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching teachers', error: err.message });
  }
};

// Get teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching teacher', error: err.message });
  }
};

// Add a new teacher
const addTeacher = async (req, res) => {
  const { teacher_id, name, password, subject, contact_info, address } = req.body;

  // Encrypt password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newTeacher = new Teacher({
    teacher_id,
    name,
    password: hashedPassword, // Store hashed password
    subject,
    contact_info,
    address,
  });

  try {
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(400).json({ message: 'Error saving teacher', error: err.message });
  }
};

// Update a teacher
const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Update teacher fields if provided
    teacher.teacher_id = req.body.teacher_id || teacher.teacher_id;
    teacher.name = req.body.name || teacher.name;
    teacher.password = req.body.password || teacher.password;
    teacher.subject = req.body.subject || teacher.subject;
    teacher.contact_info = req.body.contact_info || teacher.contact_info;
    teacher.address = req.body.address || teacher.address;

    const updatedTeacher = await teacher.save();
    res.status(200).json({
      message: 'Teacher updated successfully',
      teacher: updatedTeacher
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating teacher', error: err.message });
  }
};

// Delete a teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    await teacher.remove();
    res.json({ message: 'Teacher removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting teacher', error: err.message });
  }
};

// Login teacher
const loginTeacher = async (req, res) => {
  const { teacher_id, password } = req.body;

  try {
    // Find teacher by teacher_id in Teacherlog model for login functionality
    const teacher = await Teacherlog.findOne({ teacher_id });

    if (!teacher) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare hashed password
    const match = await bcrypt.compare(password, teacher.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      redirectUrl: '/teacher-dashboard',
      teacher: { id: teacher._id, name: teacher.name },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
};

module.exports = {
  getTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  loginTeacher,
};
