const User = require("./User");
const Poll = require("./Poll");
const Movie = require("./Movie");
const Vote = require("./Vote");
const Opt = require("./Opt");

User.hasMany(Poll, {
  foreignKey: 'user_id'
});
Poll.belongsTo(User);

User.hasMany(Vote, {
  foreignKey: 'user_id'
});
Vote.belongsTo(User);

Poll.hasMany(Opt, {
  foreignKey: 'poll_id'
});
Opt.belongsTo(Poll);

Poll.hasMany(Vote, {
  foreignKey: 'poll_id'
});
Vote.belongsTo(Poll);

Opt.hasMany(Vote, {
  foreignKey: 'opt_id'
});
Vote.belongsTo(Opt);

Movie.hasMany(Opt, {
  foreignKey: 'movie_id'
});
Opt.belongsTo(Movie);

Poll.belongsToMany(Movie, {
  through: Opt
});

module.exports = { User, Poll, Opt, Movie, Vote };
