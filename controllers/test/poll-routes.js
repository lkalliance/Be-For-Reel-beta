const router = require('express').Router();
const isAuth = require('../../utils/auth');
const { Poll } = require('../../models');


router.get('/create', async (req, res) => {
  // Sample
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const css = { url: '/css/create.css' };
    res.render('createpoll', { userInfo, css });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;