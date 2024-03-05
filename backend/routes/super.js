const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
      const allUsers = await User.find({});
    //   console.log(allUsers);
      res.status(200).json(allUsers);
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json({ error: "Failed to fetch all users" });
    }
  });

module.exports = router;
