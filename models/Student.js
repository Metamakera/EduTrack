const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentID: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  standard: { type: String, required: true },
  section: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  guardianName: { type: String, required: true },
  guardianContact: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  dateOfBirth: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
