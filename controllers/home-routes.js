const router = require('express').Router();
const { User, Poll, Movie, Opt, Vote } = require('../models');
const isAuth = require('../utils/auth');
const fetch = require('axios');

router.get('/', async (req, res) => {
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }

    const css = { url: '/css/homepage.css' }
    const today = new Date();
    const currentYear = { year: today.getFullYear() }

    console.log(currentYear);

    // Get all polls and their movies
    const pollData = await Poll.findAll({
      attributes: [ 'id', 'title', 'description' ],
      include: [{
        model: Movie,
        attributes: [ 'title', 'imdb_id' ]
      },
      {
        model: User,
        attributes: [ 'id', 'username' ]
      },
      {
        model: Opt,
        attributes: [ 'id' ],
        include: {
          model: Vote,
          attributes: [ 'id' ]
        }
      }]
    });
    
    const polls = await pollData.map((poll) => poll.get({ plain: true }));

    // randomly choose six of them
    const randomPolls = randomArray(6, polls.length);

    // for each, randomly choose a film option
    const showPolls = [];
    for (ind of randomPolls) {
      const poll = polls[ind];
      const obj = {
        poll_id: poll.id,
        poll_title: poll.title,
        poll_description: poll.description,
        poll_opts: poll.opts,
        user_id: poll.user.id,
        username: poll.user.username
      }

      const randFilm = poll.movies[Math.trunc(Math.random() * poll.movies.length)];
      obj.imdb = randFilm.imdb_id;
      showPolls.push(obj);
    }

    // for each, get the picture url and the total votes
    for ( poll of showPolls ) {
      const filmDetails = await fetch(`http://localhost:${process.env.PORT || 3001}/api/movies/info/${poll.imdb}`);
      poll.image = filmDetails.data.image;
      let votes = 0;
      for ( opt of poll.poll_opts ) votes = votes + opt.votes.length;
      poll.votes = votes;
    }

    console.log(showPolls);

    function randomArray(index, reference) {
      const numArray = [];

      while (numArray.length < Math.min(index, reference)) {
        const random = Math.trunc(Math.random() * reference);
        if ( !numArray.includes(random) ) numArray.push(random);
      }

      return numArray;
    }

    res.render('homepage', { userInfo, css, currentYear, showPolls });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); 

router.get('/login', (req, res) => {
  const userInfo = {
    username: req.session.username,
    userId: req.session.userId,
    loggedIn: req.session.loggedIn
  }

  const css = { url: '/css/login.css' }
  const today = new Date();
  const currentYear = { year: today.getFullYear() }
// Route to render login page
  res.render('login', { css, userInfo, currentYear });
});



module.exports = router;
