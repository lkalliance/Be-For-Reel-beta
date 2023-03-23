const User = require("./User");
const Poll = require("./Poll");
const Movie = require("./Movie");
const Vote = require("./Vote");
const Opt = require("./Opt");

User.hasMany(Poll, {
  foreignKey: "user_id",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Poll.hasMany(Opt, {
  foreignKey: "poll_id",
});

Opt.hasMany(Vote, {
  foreignKey: "vote_id",
});

Opt.hasOne(Movie, {
  foreignKey: "movie_id",
});

Poll.belongsTo(User, {
  foreignKey: "user_id",
});

Opt.belongsTo(Poll, {
  foreignKey: "poll_id",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Opt, {
  foreignKey: "Opt_id",
});

Movie.belongsToMany(Opt, {
  through: "movie_id",
});

Poll.belongsToMany(Movie, {
  through: Opt,
});

Movie.belongsToMany(Poll, {
  through: Opt,
});


module.exports = { User, Poll, Opt, Movie, Vote };
