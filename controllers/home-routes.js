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

    const data = 'QUERY DATABASE HERE'
    const results = data.get({ plain: true })

    res.render('HANDLEBARS TEMPLATE', { userInfo, results });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); 

router.get('/login', (req, res) => {
  // Route to render login page
  res.render('login');
});

module.exports = router;
