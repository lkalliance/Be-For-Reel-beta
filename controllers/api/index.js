const router = require('express').Router();

const userRoutes = require('./user-routes');
const movieRoutes = require('./movie-routes');
const pollRoutes = require('./poll-routes');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/polls', pollRoutes);

module.exports = router;
