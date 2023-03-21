const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Movie, Poll, Option, User } = require('../../models');
const fetch = require('axios');


router.get('/search/:string', async (req, res) => {
  // Route to get movies by title search
  try {
    const options = {
      method: 'GET',
      url: `URL GOES HERE`
    };
    const movieData = await fetch.request(options);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/info/:id', async (req, res) => {
  // Route to get specific movie data
  try {

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
