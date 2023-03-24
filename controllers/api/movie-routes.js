const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Movie, Poll, Option, User } = require('../../models');
const fetch = require('axios');


router.get('/search/:string', async (req, res) => {
  // Route to get movies by title search
  try {
    const options = {
      method: 'GET',
      url: `https://imdb-api.com/API/AdvancedSearch/${process.env.IMDB_API_KEY}?title=${req.params.string}&title_type=feature`
    };
    // clean for nc17 or tv-ma
    const movieData = await fetch.request(options);
    res.status(200).json(movieData.data.results);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/info/:id', async (req, res) => {
  // Route to get specific movie data
  try {
    const movie = {
      method: 'GET',
      url: `https://imdb-api.com/en/API/Title/${process.env.IMDB_API_KEY}/${req.params.id}/Posters,Images,Trailer,Ratings,Wikipedia`
    };

    const movieData = await fetch.request(movie);
    console.log(movieData);
    res.status(200).json(movieData.data);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
