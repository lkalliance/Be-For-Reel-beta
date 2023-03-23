const router = require('express').Router();
const isAuth = require('../../utils/auth');
const { Poll } = require('../../models');


router.get('/create', async (req, res) => {
  // Sample
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const css = { url: '/css/create.css' }

    res.render('createpoll', { userInfo, css });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/search/:string', async (req, res) => {
  // Route to get movies by title search
  try {
console.log(`searching by ${req.params.string}`);
    const options = {
      method: 'GET',
      url: `https://imdb-api.com/API/AdvancedSearch/${process.env.IMDB_API_KEY}?title=${req.params.string}&title_type=feature`
    };
    const movieData = await fetch.request(options);
    res.status(200).json(movieData.data);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;