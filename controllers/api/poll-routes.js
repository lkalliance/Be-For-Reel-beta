const router = require('express').Router();
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');
const { User, Movie, Poll, Vote, Comment, Opt } = require('../../models');


router.post('/create', withAuth, async (req, res) => {
  try {
      // creates or finds movies returns ids
      const filmList = [];
      for (film of req.body.films) {
          const temp = await Movie.findOrCreate({
              where: { imdb_id: film.imdb_id },
              defaults: {
                  image: film.image,
                  title: film.title,
              }
          })
          filmList.push(temp[0].dataValues.id);
       }

      // creates the poll
      const newPoll = await Poll.create({
          title: req.body.title,
          description: req.body.desc,
          user_id: req.session.userId,
      });
      
      // creates the options for polls
      for (opts of filmList) {
          const temp = await Opt.create({
              poll_id: newPoll.dataValues.id,
              movie_id: opts,
          })
      }

      const idPoll = newPoll.dataValues.id;

      res.json({ a: idPoll });

  }  catch (err) {
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

    html = ''
    // Query the database to get a user with a specific ID
    await Vote.findByPk(req.params.id).then((vote) => {
      html = `
      <html>
        <body>
          <h1>ID: ${vote.id}</h1>
          <h1>Opt_id: ${vote.opt_id}</h1>
          <h1>User_id: ${vote.user_id}</h1>
          <h1>comment: ${vote.comment}</h1>
        </body>
      </html>
    `;
    });

    res.send(html);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.get('/create', withAuth, async (req, res) => {
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


router.post('/vote/:opt_id', withAuth, async (req, res) => {

    try {
        // get poll id for option id
        const optionID = req.body.option;
        const pollId = await Opt.findOne({
            where: {id: optionID}
        });

        // check for vote by user id and poll id
        const vote = await Vote.findOrCreate({
            where: {
                user_id: req.session.userId,
                poll_id: pollId.dataValues.poll_id,
            },
            defaults: {
                opt_id: req.body.option,
                comment: req.body.comment,
            }
        });

        res.json();
    }  catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
module.exports = router;