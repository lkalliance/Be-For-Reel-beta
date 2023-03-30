const router = require('express').Router();
const isAuth = require('../utils/auth');
const { Poll, Opt, User, Movie, Vote } = require('../models');
const fetch = require('axios');

router.get('/', async (req, res) => {

  const userInfo = {
    username: req.session.username,
    userId: req.session.userId,
    loggedIn: req.session.loggedIn
  }
  const css = { url: '/css/viewPolls.css' };
  const today = new Date();
  const currentYear = { year: today.getFullYear() };

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
  for ( poll of polls ) {
    let commentCt = 0;
    for ( vote of poll.votes ) {
      console.log(vote);
      if ( vote.comment && vote.comment !== "" ) commentCt++
      console.log(commentCt);
    }
    poll.totalVotes = poll.votes.length;
    poll.totalComments = commentCt;
  }

  console.log(polls);
  res.render('view_polls', { css, userInfo, currentYear, polls })
})




router.get('/view/:id', async (req, res) => {
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const css = { url: '/css/view.css' };
    const today = new Date();
    const currentYear = { year: today.getFullYear() };

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

    if (req.session.userId) {
      const userData = await User.findByPk(req.session.userId, {
        where: { id: req.session.userId },
        attributes: [ 'id' ]
      })
      const user = await userData.get({ plain: true });
    } else {
      user = { id: false }
    }

    let topVotes = 0;
    for (opt of poll.opts) {
      const voteString = `${opt.votes.length} vote${(opt.votes.length == 1) ? "" : "s"}`;
      opt.voteString = voteString;
      opt.voteCount = opt.votes.length;
      topVotes = Math.max(topVotes, opt.voteCount);
    }
    for (opt of poll.opts) {
      if (opt.voteCount == topVotes) opt.voteClass = "top";
      else opt.voteClass = "";
    }

    if ( userInfo.loggedIn ) poll.opts.sort(sortByVotes);
    else poll.opts.sort(sortAlpha);

    
    // get comments, and sniff for whether this user has voted in this poll
    const comments = [];
    let hasVoted = false;
    for ( opt of poll.opts ) {
      for ( vote of opt.votes ) {
        if ( vote.user_id == req.session.userId) {
          opt.votedClass = "voted";
          if (user) user.voted = opt.movie.title;
        }
        else opt.votedClass="";
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
    poll.hasVoted = hasVoted;
    comments.sort(sortDates);
    poll.commentsText = ( comments.length == 1 ) ? "1 comment has been left on this poll" : `${comments.length} comments have been left on this poll`;
    
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
  // Sample
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const css = { url: '/css/vote.css' };
    const today = new Date();
    const currentYear = { year: today.getFullYear() };

    if (!userInfo.loggedIn) {
      res.redirect(`/polls/view/${req.params.id}`);
      return;
    }

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

    // get comments, and sniff for whether this user has voted in this poll
    const comments = [];
    for ( opt of poll.opts ) {
      for ( vote of opt.votes ) {
        if ( vote.user_id == req.session.userId) {
          res.redirect(`/polls/view/${req.params.id}`);
          return;
        };
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