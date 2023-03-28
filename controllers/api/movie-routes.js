const router = require('express').Router();
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');
const { Movie, Poll, Option, User } = require('../../models');
const fetch = require('axios');


router.get('/search/:string', withAuth, async (req, res) => {
  // Route to get movies by title search
  try {
    const options = {
      method: 'GET',
      url: `https://imdb-api.com/API/AdvancedSearch/${process.env.IMDB_API_KEY}?title=${req.params.string}&title_type=feature`
    };

    const movieData = await fetch.request(options);
    const returnMovies = movieData.data.results;

    // clean for nc17, tv-ma, x and upcoming
    let ratedMovies = returnMovies.filter(val => val.contentRating !== "NC-17");
    ratedMovies = ratedMovies.filter(val => val.contentRating !== "TV-MA");
    ratedMovies = ratedMovies.filter(val => val.contentRating !== "X");
    ratedMovies = ratedMovies.filter(val => val.plot !== null);

    res.status(200).json(ratedMovies);
    
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
      url: `https://imdb-api.com/en/API/Title/${process.env.IMDB_API_KEY}/${req.params.id}/Trailer,Ratings,Wikipedia`
    };

    const movieData = await fetch.request(movie);
    //console.log(movieData);
    res.status(200).json(movieData.data);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
