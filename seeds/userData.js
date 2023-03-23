const { User } = require('../models');

const userdata = [
  {
    username: 'UserOne',
    email: 'userone@gmail.com',
    password: '12345678',
  },
  {
    username: 'UserTwo',
    email: 'usertwo@gmail.com',
    password: '23456789',
  },
  {
    username: 'UserThree',
    email: 'userthree@yahoo.com',
    password: '34567890',
  },
  {
    username: 'UserFour',
    email: 'userfour@hotmail.com',
    password: '45678901',
  },
  {
    username: 'UserFive',
    email: 'userfive@outlook.com',
    password: '56789012',
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
