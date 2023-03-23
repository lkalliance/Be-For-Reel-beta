const User = require("./User");
const Poll = require("./Poll");
const Movie = require("./Movie");
const Vote = require("./Vote");
const Option = require("./Option");

User.hasMany(Poll, {
  foreignKey: "user_id",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Poll.hasMany(Option, {
  foreignKey: "poll_id",
});

Option.hasMany(Vote, {
  foreignKey: "vote_id",
});

Option.hasOne(Movie, {
  foreignKey: "movie_id",
});

Poll.belongsTo(User, {
  foreignKey: "user_id",
});

Option.belongsTo(Poll, {
  foreignKey: "poll_id",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Option, {
  foreignKey: "option_id",
});

Movie.hasMany(Option, {
  through: "movie_id",
});

Poll.belongsToMany(Movie, {
  through: Option,
});

Movie.belongsToMany(Poll, {
  through: Option,
});

/* EXAMPLES:

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
})

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
}) */

module.exports = { User, Poll, Movie, Vote, Option };
