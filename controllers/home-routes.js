const router = require('express').Router();
const { User } = require('../models');
const isAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  // Sample
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }

    const css = { url: '/css/homepage.css' }
    const today = { year: new Date().getFullYear() }

    // const data = 'QUERY DATABASE HERE'
    // const results = data.get({ plain: true })

    res.render('homepage', { userInfo, css, today });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); 




router.get('/login', (req, res) => {
  const css = { url: "/css/login.css" };
  // Route to render login page
  res.render('login', { css });
});

module.exports = router;
