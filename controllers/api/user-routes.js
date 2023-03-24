const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Movie, Poll, Vote, Comment } = require('../../models');

router.post('/', async (req, res) => {
  // Route to create a new user
  try {
    const dbUserData = await User.create(req.body);

    req.session.save(() => {
      req.session.username = dbUserData.username;
      req.session.userId = dbUserData.id;
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again.'});
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      dbUserData.password
    )

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again.'});
      return;
    }

    req.session.save(() => {
      req.session.username = dbUserData.username;
      req.session.userId = dbUserData.id;
      req.session.loggedIn = true;
      res.json({ user: dbUserData, message: 'You are logged in.'});
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
