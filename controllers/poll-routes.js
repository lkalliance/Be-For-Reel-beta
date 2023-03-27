const router = require('express').Router();
const isAuth = require('../utils/auth');
const { Poll, Opt, User, Movie, Vote } = require('../models');

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
    attributes: [ 'id', 'title', 'description', 'created_at' ],
    include: [
      {
        model: User,
        attributes: [ 'id', 'username' ]
      },
      {
        model: Vote,
        attributes: [ 'poll_id' ]
      }
    ]
  })

  const polls = await pollData.map((poll) => poll.get({ plain: true }));
  for ( poll of polls ) {
    let commentCt = 0;
    for ( vote of poll.votes ) {
      if ( vote.comment && vote.comment !== "" ) commentCt++
    }
    poll.totalVotes = poll.votes.length;
    poll.totalComments = commentCt;
  }

  res.render('view_polls', { css, userInfo, currentYear, polls })
})




router.get('/view/:id', async (req, res) => {
  console.log(req);
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
      attributes: [ 'id', 'title', 'description' ],
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
    const poll = pollData.get({ plain: true });
    for (opt of poll.opts) {
      opt.voteCount = opt.votes.length;
    }

    if ( userInfo.loggedIn ) poll.opts.sort(sortByVotes);
    else poll.opts.sort(sortAlpha);

    
    // get comments, and sniff for whether this user has voted in this poll
    const comments = [];
    let hasVoted = false;
    for ( opt of poll.opts ) {
      for ( vote of opt.votes ) {
        console.log(hasVoted, vote.user_id, req.session.userId);
        if ( vote.user_id == req.session.user) hasVoted=opt.id;
        if ( vote.comment !== "" ) {
          comments.push({
            movie: opt.movie.title,
            user: vote.user.username,
            user_id: vote.user_id,
            comment: vote.comment,
            created: vote.created_at
          })
        }
        console.log(hasVoted, vote.user_id, req.session.userId);

      }
    }
    poll.hasVoted = hasVoted;
    comments.sort(sortDates);
    
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

    console.log(poll);
    res.render('view', { userInfo, css, currentYear, poll, comments });
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
      attributes: [ 'id', 'title', 'description' ],
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
      }]
    });
    const poll = pollData.get({ plain: true });
    poll.opts.sort(sortAlpha);

    // get comments, and sniff for whether this user has voted in this poll
    const comments = [];
    for ( opt of poll.opts ) {
      for ( vote of opt.votes ) {
        if ( vote.user_id == req.session.user) {
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