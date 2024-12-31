const mongoose = require('mongoose');

// Define the Teacher schema
const teacherSchema = new mongoose.Schema({
  teacher_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  subject: { type: String, required: true },
  contact_info: { type: String, required: true },
  address: { type: String, required: true },
});

// Create the Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
