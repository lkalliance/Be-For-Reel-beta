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

router.post('/login', async (req, res) => {
  console.log(req.body);
  // CHANGE THE ROUTE HERE TO WHATEVER 
  res.sendStatus(200);
});

module.exports = router;
