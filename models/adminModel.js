const mongoose = require('mongoose');

const AdminInfoSchema = new mongoose.Schema({
  admin_name: {
    type: String,
    required: true,
    unique: true,
  },
  profession: String,
  experience: String,
  skills: [String],
  bio: String,
  contact: String,
  imageUrl: String,
});

const AdminInfo = mongoose.model('AdminInfo', AdminInfoSchema);

module.exports = AdminInfo;
