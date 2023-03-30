const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.post('/', async (req, res) => {
  // creates a new user
  try {
    // first check to make sure username doesn't already exist
    const dbUsername = await User.findOne({
      where: { username: req.body.username }
    });
    if ( dbUsername ) {
      // if it exists, let them know
      res.status(400).json({ message: `Username '${req.body.username}' is taken. Please try again.`, type: 'username' });
      return;
    }

    // then check to make sure email doesn't already exist
    const dbEmail = await User.findOne({
      where: { email: req.body.email }
    });
    if ( dbEmail ) {
      // if it exists, let them know
      res.status(400).json({ message: `An account with email '${req.body.email}' already exists. Please try again.`, type: 'username' });
      return;
    }
    
    // if they've got this far, go ahead and create the user
    const dbUserData = await User.create(req.body);

    if (!dbUserData) {
      res.status(400).json({ message: 'Failed to create this user. Please try again.' });
      return;
    }

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

router.post('/login', async (req, res) => {
  try {
    // Processes a user's attempt to log in
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // if the username doesn't exist, tell them
    if (!dbUserData) {
      res.status(400).json({ message: `Username '${req.body.username}' does not exist. Please try again.`, type: 'username' });
      return;
    }

    // check the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      dbUserData.password
    )

    // if the password doesn't check out, tell them
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password. Please try again.', type: 'password'});
      return;
    }

    // go ahead and log them in
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



router.post('/logout', (req, res) => {
  // logs the user out
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
