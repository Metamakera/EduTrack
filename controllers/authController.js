const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');

// Function to authenticate users
const authenticateUser = async (req, res, role) => {
  const { username, password } = req.body;

  try {
    let user;
    
    if (role === 'Student') {
      user = await Student.findOne({ username });
    } else if (role === 'Teacher') {
      user = await Teacher.findOne({ username });
    } else if (role === 'Admin') {
      user = await Admin.findOne({ username });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Endpoint for Student login
const studentLogin = (req, res) => authenticateUser(req, res, 'Student');

// Endpoint for Teacher login
const teacherLogin = (req, res) => authenticateUser(req, res, 'Teacher');

// Endpoint for Admin login
const adminLogin = (req, res) => authenticateUser(req, res, 'Admin');

module.exports = { studentLogin, teacherLogin, adminLogin };
