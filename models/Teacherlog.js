const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacher_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  subject: String,
  contact_info: String,
  address: String,
});

const Teacher = mongoose.model('Teacherlog', teacherlog);

module.exports = Teacher;
