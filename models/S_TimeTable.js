// models/S_TimeTable.js
const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  Monday: [{ time: String, subject: String }],
  Tuesday: [{ time: String, subject: String }],
  Wednesday: [{ time: String, subject: String }],
  Thursday: [{ time: String, subject: String }],
  Friday: [{ time: String, subject: String }],
  Saturday: [{ time: String, subject: String }],
});

const S_TimeTable = mongoose.model('S_TimeTable', timetableSchema);
module.exports = S_TimeTable;
