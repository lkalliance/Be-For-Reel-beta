const router = require('express').Router();
const isAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  // Sample
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    res.render('createpoll', { userInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;