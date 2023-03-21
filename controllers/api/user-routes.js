const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Movie, Poll, Vote, Comment } = require('../../models');

router.post('/', async (req, res) => {
  // Route to create a new user
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
