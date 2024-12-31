const express = require('express');

// Route handler for fetching Admin info
const getAdminInfo = (adminInfoCollection) => {
  return async (req, res) => {
    const { admin_name } = req.params;
    try {
      const adminInfo = await adminInfoCollection.findOne({ admin_name: admin_name });
      if (adminInfo) {
        res.json(adminInfo);
      } else {
        res.status(404).json({ message: 'Admin not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
};

// Setup the route for Admin info API
module.exports = (adminInfoCollection) => {
  const router = express.Router();
  router.get('/:admin_name', getAdminInfo(adminInfoCollection));
  return router;
};
