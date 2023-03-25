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

Opt.hasMany(Vote, {
  foreignKey: 'opt_id'
})
Vote.belongsTo(Opt);

Movie.hasMany(Opt, {
  foreignKey: 'movie_id'
})
Opt.belongsTo(Movie);

Poll.belongsToMany(Movie, {
  through: Opt
});

Movie.belongsToMany(Poll, {
  through: Opt
});

// Poll.hasMany(Vote, {
//   through: Opt
// });

// Vote.hasOne(Poll, {
//   through: Opt
// });

// Movie.hasMany(Vote, {
//   through: Opt
// });

// Vote.belongsTo(Movie, {
//   through: Opt
// });







// User.hasMany(Poll, {
//   foreignKey: "user_id",
// });

// User.hasMany(Vote, {
//   foreignKey: "user_id",
// });

// Poll.belongsTo(User, {
//   through: "user_id"
// })

// Poll.hasMany(Opt, {
//   foreignKey: "poll_id",
// });

// Poll.hasMany(Movie, {
//   through: Opt
// });

// Poll.hasMany(Vote, {
//   through: Opt
// });

// Opt.hasMany(Vote, {
//   foreignKey: "opt_id",
// });

// Opt.belongsTo(Poll, {
//   through: 'opt_id'
// })

// Opt.hasOne(Movie, {
//   through: 'movie_id'
// })

// Movie.belongsToMany(Opt, {
//   through: "movie_id",
// });

// Movie.belongsToMany(Poll, {
//   through: Opt
// });

// Vote.belongsTo(User, {
//   through: 'user_id'
// });

// Vote.belongsTo(Opt, {
//   through: 'opt_id'
// });

// Vote.belongsTo(Poll, {
//   through: Opt
// })


module.exports = { User, Poll, Opt, Movie, Vote };
