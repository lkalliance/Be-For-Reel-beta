const router = require('express').Router();
const isAuth = require('../utils/auth');
const { Poll, Opt, User, Movie, Vote } = require('../models');

router.get('/vote/:id', async (req, res) => {
  // Sample
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const css = { url: '/css/vote.css' };

    html = ''
    // Query the database to get a user with a specific ID
    await Vote.findByPk(req.params.id).then((vote) => {
      html = `
      <html>
        <body>
          <h1>ID: ${vote.id}</h1>
          <h1>Opt_id: ${vote.opt_id}</h1>
          <h1>User_id: ${vote.user_id}</h1>
          <h1>comment: ${vote.comment}</h1>
        </body>
      </html>
    `;
    });

    res.send(html);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.get('/create', isAuth, async (req, res) => {
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const today = new Date();
    const currentYear = { year: today.getFullYear() };
    const css = { url: '/css/create.css' };
    res.render('createpoll', { userInfo, css, currentYear });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;