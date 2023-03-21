const router = require('express').Router();

const pollRoutes = require('./poll-routes');

router.use('/polls', pollRoutes);

module.exports = router;
