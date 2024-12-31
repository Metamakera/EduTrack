const AdminInfo = require('../models/adminModel');

// Controller function to fetch admin info by admin_name
const getAdminInfo = async (req, res) => {
  const { admin_name } = req.params;
  try {
    const adminInfo = await AdminInfo.findOne({ admin_name: admin_name });
    if (adminInfo) {
      res.json(adminInfo);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getAdminInfo };
