const router = require('express').Router();
const isAuth = require('../utils/auth');
const { Poll, Opt, User, Movie, Vote } = require('../models');
const fetch = require('axios');

router.get('/', async (req, res) => {
  try {
    // render the polls list page

    // create the rendering assets
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const css = { url: '/css/viewPolls.css' };
    const today = new Date();
    const currentYear = { year: today.getFullYear() };

    // get information on all polls
    const pollData = await Poll.findAll({
      order: [['created_at', 'DESC']],
      attributes: [ 'id', 'title', 'description', 'created_at' ],
      include: [
        {
          model: User,
          attributes: [ 'id', 'username' ]
        },
        {
          model: Vote,
          attributes: [ 'poll_id', 'comment' ]
        }
      ]
    })
    const polls = await pollData.map((poll) => poll.get({ plain: true }));

    // for each poll, count up the votes and comments
    for ( poll of polls ) {
      let commentCt = 0;
      for ( vote of poll.votes ) {
        if ( vote.comment && vote.comment !== "" ) commentCt++
      }
      poll.totalVotes = poll.votes.length;
      poll.totalComments = commentCt;
    }

    res.render('pollList', { css, userInfo, currentYear, polls })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


router.get('/view/:id', async (req, res) => {
  try {
    // render the "view poll" page

    // create the rendering assets
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const css = { url: '/css/view.css' };
    const today = new Date();
    const currentYear = { year: today.getFullYear() };

    // get the data on this poll
    const pollData = await Poll.findByPk(req.params.id, {
      attributes: [ 'id', 'title', 'description', 'created_at' ],
      include: [{
          model: User,
          attributes: [ 'id', 'username' ]
        },
        {
        model: Opt,
        attributes: [ 'id', 'movie_id' ],
        include: [
          {
            model: Movie,
            attributes: [ 'id', 'title', 'imdb_id' ]
          },
          {
            model: Vote,
            attributes: [ 'id', 'comment', 'user_id', 'created_at' ],
            include: {
              model: User,
              attributes: [ 'username' ]
            }
          }
        ]
      }]
    });
    const poll = await pollData.get({ plain: true });

    // get the information on the logged-in user's vote on this poll
    const user = {
      loggedIn: req.session.loggedIn
    }
    if (user.loggedIn) {
      const userData = await User.findByPk(req.session.userId, {
        where: { id: req.session.userId },
        attributes: [ 'id' ]
      })
      const userClean = await userData.get({ plain: true });
      user.data = userClean
    } else {
      user.data = null
    }

    // first determine what the high vote count is
    let topVotes = 0;
    for (opt of poll.opts) {
      const voteString = `${opt.votes.length} vote${(opt.votes.length == 1) ? "" : "s"}`;
      opt.voteString = voteString;
      opt.voteCount = opt.votes.length;
      topVotes = Math.max(topVotes, opt.voteCount);
    }
    // now determine and mark which options are the top vote-getters
    for (opt of poll.opts) {
      if (opt.voteCount == topVotes) opt.voteClass = "top";
      else opt.voteClass = "";
    }

    // if the user is logged in, sort the options by vote count
    // if not, sort by alpha
    if ( userInfo.loggedIn ) poll.opts.sort(sortByVotes);
    else poll.opts.sort(sortAlpha);

    // iterate over the options and collect various things
    const comments = [];
    let hasVoted = false;
    for ( opt of poll.opts ) {
      // iterate over the votes on this comment
      for ( vote of opt.votes ) {
        // did the current user vote on this option?
        if ( vote.user_id == req.session.userId) {
          opt.votedClass = "voted";
          if (user.data) user.voted = opt.movie.title;
        } else {
          opt.votedClass="";
        }
        // collect the comment with this option
        if ( vote.comment !== "" ) {
          comments.push({
            movie: opt.movie.title,
            user: vote.user.username,
            user_id: vote.user_id,
            comment: vote.comment,
            created: vote.created_at
          })
        }
      }

      // call our API to go fetch information on each movie
      const fetchUrl = `http://localhost:${process.env.PORT || 3001}/api/movies/info/${opt.movie.imdb_id}`;
      const movieData = await fetch(fetchUrl);
      opt.movie.stars = movieData.data.stars;
      opt.movie.plot = movieData.data.plot;
      opt.movie.wikipedia = movieData.data.wikipedia.url;
      opt.movie.image = movieData.data.image;
      opt.movie.trailer = movieData.data.trailer.link;
      opt.movie.genres = movieData.data.genres;
      opt.movie.rating = movieData.data.contentRating;
      opt.movie.imdb_rating = movieData.data.imDbRating;
      opt.movie.usaGross = movieData.data.boxOffice.grossUSA;
      opt.movie.worldwideGross = movieData.data.boxOffice.cumulativeWOldWideGross;
    }

    // flag for what this user has voted on
    poll.hasVoted = hasVoted;
    comments.sort(sortDates);

    // craft the appropriate phrasing for the not-logged-in message
    poll.commentsText = ( comments.length == 1 ) ? "1 comment has been left on this poll" : `${comments.length} comments have been left on this poll`;
    
    // various sorting functions
    function sortByVotes(a, b) {
      return b.voteCount - a.voteCount;
    }

    function sortDates(a,b) {
      return b.created - a.created;
    }

    function sortAlpha(a, b) {
      const aRaw = a.movie.title;
      const bRaw = b.movie.title;
      let aSort, bSort;
      if (aRaw.startsWith("The ")) { aSort = aRaw.replace("The ", ""); }
      else { aSort = aRaw }
      if (bRaw.startsWith("The ")) { bSort = bRaw.replace("The ", ""); }
      else { bSort = bRaw }

      return (aSort > bSort) ? 1 : -1;
    }

    res.render('view', { userInfo, css, currentYear, poll, comments, user });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/vote/:id', async (req, res) => {
  try {
    // render the voting page

    // create the rendering assets
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const css = { url: '/css/vote.css' };
    const today = new Date();
    const currentYear = { year: today.getFullYear() };

    // if the user isn't logged in, send him to the view page instead
    if (!userInfo.loggedIn) {
      res.redirect(`/polls/view/${req.params.id}`);
      return;
    }

    // get the data on the poll
    const pollData = await Poll.findByPk(req.params.id, {
      attributes: [ 'id', 'title', 'description', 'created_at' ],
      include: [{
        model: Opt,
        attributes: [ 'id', 'movie_id' ],
        include: [
          {
            model: Movie,
            attributes: [ 'id', 'title', 'imdb_id' ]
          },
          {
            model: Vote,
            attributes: [ 'id', 'comment', 'user_id', 'created_at' ],
            include: {
              model: User,
              attributes: [ 'username' ]
            }
          }
        ]
      },
      {
        model: User,
        attributes: [ 'id', 'username' ]
      }]
    });
    const poll = pollData.get({ plain: true });
    poll.opts.sort(sortAlpha);

    // iterate over this poll's options
    const comments = [];
    for ( opt of poll.opts ) {
      for ( vote of opt.votes ) {
        if ( vote.user_id == req.session.userId) {
          // the user has voted, reroute him to the view page
          res.redirect(`/polls/view/${req.params.id}`);
          return;
        };
        // collect all the comments
        if ( vote.comment !== "" ) {
          comments.push({
            movie: opt.movie.title,
            user: vote.user.username,
            user_id: vote.user_id,
            comment: vote.comment,
            created: vote.created_at
          })
        }
      }

      // call our API get data on each movie
      const fetchUrl = `http://localhost:${process.env.PORT || 3001}/api/movies/info/${opt.movie.imdb_id}`;
      const movieData = await fetch(fetchUrl);
      opt.movie.stars = movieData.data.stars;
      opt.movie.plot = movieData.data.plot;
      opt.movie.wikipedia = movieData.data.wikipedia.url;
      opt.movie.image = movieData.data.image;
      opt.movie.trailer = movieData.data.trailer.link;
      opt.movie.genres = movieData.data.genres;
      opt.movie.rating = movieData.data.contentRating;
      opt.movie.imdb_rating = movieData.data.imDbRating;
      opt.movie.usaGross = movieData.data.boxOffice.grossUSA;
      opt.movie.worldwideGross = movieData.data.boxOffice.cumulativeWOldWideGross;
    }
    comments.sort(sortDates);

    // sorting functions
    function sortAlpha(a, b) {
      const aRaw = a.movie.title;
      const bRaw = b.movie.title;
      let aSort, bSort;
      if (aRaw.startsWith("The ")) { aSort = aRaw.replace("The ", ""); }
      else { aSort = aRaw }
      if (bRaw.startsWith("The ")) { bSort = bRaw.replace("The ", ""); }
      else { bSort = bRaw }

      return (aSort > bSort) ? 1 : -1;
    }

    function sortDates(a,b) {
      return b.created - a.created;
    }

    res.render('vote', { userInfo, css, currentYear, poll, comments });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/create', isAuth, async (req, res) => {
  try {
    // render the "create poll" page

    // create render assets
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const today = new Date();
    const currentYear = { year: today.getFullYear() };
    const css = { url: '/css/create.css' };
    
    res.render('createpoll', { userInfo, css, currentYear });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;