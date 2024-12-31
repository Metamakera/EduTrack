const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacher_id: { 
    type: String, 
    required: true, 
    unique: true // Ensure teacher_id is unique
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username is unique
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  contact_info: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, { collection: 'Teacher_info' }); // Specify the collection name

// Export the model
module.exports = mongoose.model('teacher', teacherSchema);
