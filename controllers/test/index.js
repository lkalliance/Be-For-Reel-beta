const router = require('express').Router();

const pollRoutes = require('./poll-routes');
const homeRoutes = require('./home-routes');

router.use('/polls', pollRoutes);
router.use('/home', homeRoutes);

module.exports = router;
