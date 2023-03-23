const { Opt } = require('../models');

const optData = [
  {
    poll_id: 1,
    movie_id: 1
  },
  {
    poll_id: 1,
    movie_id: 2
  },
  {
    poll_id: 1,
    movie_id: 3
  },
  {
    poll_id: 1,
    movie_id: 4
  },
  {
    poll_id: 1,
    movie_id: 5
  },
  {
    poll_id: 2,
    movie_id: 6
  },
  {
    poll_id: 2,
    movie_id: 7
  },
  {
    poll_id: 2,
    movie_id: 8
  },
  {
    poll_id: 2,
    movie_id: 9
  },
  {
    poll_id: 3,
    movie_id: 10
  },
  {
    poll_id: 3,
    movie_id: 11
  },
  {
    poll_id: 4,
    movie_id: 12
  },
  {
    poll_id: 4,
    movie_id: 13
  },
  {
    poll_id: 5,
    movie_id: 14
  },
  {
    poll_id: 5,
    movie_id: 6
  },
  {
    poll_id: 6,
    movie_id: 15
  },
  {
    poll_id: 6,
    movie_id: 16
  },
  {
    poll_id: 6,
    movie_id: 17
  },
  {
    poll_id: 6,
    movie_id: 18
  },
  {
    poll_id: 7,
    movie_id: 19
  },
  {
    poll_id: 7,
    movie_id: 20
  },
  {
    poll_id: 7,
    movie_id: 21
  },
  {
    poll_id: 7,
    movie_id: 22
  },
  {
    poll_id: 7,
    movie_id: 23
  },
  {
    poll_id: 7,
    movie_id: 24
  }
];

const seedOpt = () => Opt.bulkCreate(optData);

module.exports = seedOpt;
