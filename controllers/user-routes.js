const router = require('express').Router();
const isAuth = require('../utils/auth');
const { Poll, Opt, User, Movie, Vote } = require('../models');

router.get('/', async (req, res) => {
  // Getting a list of users
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const css = { url: '/css/vote.css' };
    const today = new Date();
    const currentYear = { year: today.getFullYear() }

    res.render('userList', { userInfo, css, currentYear });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // Render user profile
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const today = new Date();
    const currentYear = { year: today.getFullYear() };
    const css = { url: '/css/userProfile.css' };

    const userData = await User.findByPk( req.params.id, {
      attributes: [ 'id', 'username', 'created_at' ],
      include: [{
        model: Poll,
        attributes: [ 'id', 'title', 'created_at' ],
        includes: {
          model: Vote,
          attributes: [ 'id' ]
        }
      },
      {
        model: Vote,
        attributes: [ 'id', 'comment' ],
        include: [{
          model: Movie,
          attributes: [ 'title' ]
        },
        {
          model: Poll,
          attributres: [ 'id', 'title' ]
        }]
      }]
    })
    const user = await userData.get({ plain: true });

    console.log(user);



    res.render('userProfile', { userInfo, css, currentYear });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;