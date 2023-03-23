const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedPoll = require('./pollData');
const seedOpt = require('./optionData')
const seedMovie = require('./movieData')
const seedVote = require('./voteData')


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPoll();

  await seedMovie();

  await seedOpt();

  await seedVote();

  process.exit(0);
};

seedAll();
