const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.post('/', async (req, res) => {
  // Route to create a new user
  try {
    const newUser = req.body;
    const dbUserData = await User.create(newUser);

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  // Route to log in
  try {
    // search for the user by email
    const userData = await User.findOne({
      where: {
        username: req.body.username
      },
    });

    if (!userData) {
      // no match, go away
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // using bcrypt, check password
    const validPassword = await bcrypt.compare(req.body.password,userData.password)

    if (!validPassword) {
      // wrong password, go away
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      // all cool, log user in, save id and username to session
      req.session.loggedIn = true;
      req.session.user = userData.id;
      req.session.username = userData.username;

      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  // Route to log out
  if (req.session.loggedIn) {
    // if logged in, destroy the session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
