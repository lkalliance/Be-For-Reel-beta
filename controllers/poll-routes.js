const router = require('express').Router();
const isAuth = require('../utils/auth');
const { Poll, Opt, User, Movie, Vote } = require('../models');


router.get('/create', isAuth, async (req, res) => {
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const today = new Date();
    const currentYear = today.getFullYear();
    const css = { url: '/css/create.css' };
    res.render('createpoll', { userInfo, css, currentYear });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;