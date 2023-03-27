const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const pollRoutes = require('./poll-routes');
const userRoutes = require('./user-routes');
const testRoutes = require('./test');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/polls', pollRoutes);
router.use('/users', userRoutes);
router.use('/test', testRoutes);

module.exports = router;
