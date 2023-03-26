const router = require('express').Router();
const isAuth = require('../utils/auth');
const { Poll, Opt, User, Movie, Vote } = require('../models');

router.get('/vote/:id', async (req, res) => {
  // Sample
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    const css = { url: '/css/vote.css' };

    // const pollData = await Poll.findByPk(req.params.id, {
    //   attributes: [ 'id', 'title', 'description' ],
    //   include: [{
    //     model: Opt,
    //     attributes: [ 'id', 'movie_id' ],
    //     include: [
    //       {
    //         model: Movie,
    //         attributes: [ 'id', 'title', 'imdb_id' ]
    //       },
    //       {
    //         model: Vote,
    //         attributes: [ 'id' ]
    //       }
    //     ]
    //   }]
    // });
    // const poll = pollData.get({ plain: true });

    // const optData = await Opt.findAll({
    //   where: { poll_id: req.params.id },
    //   attributes: [ 'id', 'poll_id', 'movie_id' ],
    //   include: [
    //     { 
    //       model: Vote,
    //       attributes: [ 'comment' ],
    //       include: {
    //         model: User,
    //         attributes: [ 'username', 'id' ]
    //       }
    //     },
    //     {
    //       model: Movie,
    //       attributes: ['title']
    //     }]
    // })

    // const opts = await optData.map( (opt) => opt.get({ plain: true }));
    
    // const optComments = opts.map((opt) => {
    //   const comms = [];
    //   for (vote of opt.votes) {
    //     if (vote.comment !== "") {
    //       comms.push({
    //         comment: vote.comment,
    //         username: vote.user.username,
    //         user_id: vote.user.id,
    //         movie: opt.movie.title
    //       })
    //     }
    //   }
    //   return comms;
    // });

    // const comments = [];
    // for (oc of optComments) {
    //   for (comment of oc) {
    //     comments.push(comment);
    //   }
    // }

    // console.log(comments);

    const comments = [
      {
        comment: 'OMG. Why.',
        username: 'UserTwo',
        user_id: 2,
        movie: 'Step Brothers (2008)'
      },
      {
        comment: 'This is a tough one. It took me quite some time to come up with the answer.',
        username: 'UserFive',
        user_id: 5,
        movie: 'Borat (2006)'
      },
      {
        comment: 'I get to comment? I get to express myself? That makes me very happy!',
        username: 'UserTwo',
        user_id: 2,
        movie: 'Borat (2006)'
      },
      {
        comment: 'First!',
        username: 'UserThree',
        user_id: 3,
        movie: 'Borat (2006)'
      },
      {
        comment: "Did you know that that movie even existed? I didn't, and I don't know anyone that did.",
        username: 'UserFive',
        user_id: 5,
        movie: 'The Green Hornet (2011)'
      },
      {
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repudiandae adipisci temporibus deleniti unde atque molestiae error molestias at, fuga, enim ducimus magni iusto excepturi quaerat eum nemo eligendi eos fugit dolor!',
        username: 'UserOne',
        user_id: 1,
        movie: 'The Green Hornet (2011)'
      },
      {
        comment: 'Comments can be much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much longer than one sentence.',
        username: 'UserThree',
        user_id: 3,
        movie: 'The Green Hornet (2011)'
      },
      {
        comment: 'Yay for comments!',
        username: 'UserFour',
        user_id: 4,
        movie: 'The Green Hornet (2011)'
      },
      {
        comment: 'Make money from home! I make $5,000 a  month placing tiny ads, in just two hours a week!',
        username: 'UserOne',
        user_id: 1,
        movie: 'The Banshees of Inisherin (2022)'
      },
      {
        comment: 'Comment goes here',
        username: 'UserFour',
        user_id: 4,
        movie: 'The Banshees of Inisherin (2022)'
      }
    ];
    

    const poll = {
      title: 'What is your favorite Star Wars movie?',
      description: "This is a great description of this poll. I don't think it's possible to write a better one. I'm very impressed with myself. May the Force be with you.",
      opts: [
        {
          id: 6,
          movie_id: 6,
          movie: {
            id: 6,
            title: 'Star Wars Episode IV - A New Hope (1977)',
            imdb_id: 'tt0076759',
            year: "1977",
            image: "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_Ratio0.6762_AL_.jpg",
            plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
            stars: "Mark Hamill, Harrison Ford, Carrie Fisher",
            contentRating: "PG",
	          imDbRating: "8.6",
            wikipedia: "https://en.wikipedia.org/wiki/Star_Wars_(film)",
            genres: "Action, Adventure, Fantasy",
            trailer: "https://www.imdb.com/video/vi1317709849",
            grossUSA: "$460,998,507",
            grossWorldwide: "$775,398,007"
          },
          votes: [ { id: 1 }, { id: 98 } ]
        },
        {
          id: 7,
          movie_id: 7,
          movie: {
            id: 7,
            title: 'Star Wars Episode V - The Empire Strikes Back (1983)',
            imdb_id: 'tt0080684',
            year: "1980",
            image: "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.6762_AL_.jpg",
            plot: "After the Rebels are overpowered by the Empire, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.",
            stars: "Mark Hamill, Harrison Ford, Carrie Fisher",
            contentRating: "PG",
	          imDbRating: "8.7",
            wikipedia: "https://en.wikipedia.org/wiki/The_Empire_Strikes_Back",
            genres: "Action, Adventure, Fantasy",
            trailer: "https://www.imdb.com/video/vi221753881",
            grossUSA: "$292,753,960",
            grossWorldwide: "$538,375,067"
          },
          votes: [
            { id: 15 },
            { id: 33 },
            { id: 38 },
            { id: 73 },
            { id: 96 },
            { id: 126 }
          ]
        },
        {
          id: 8,
          movie_id: 8,
          movie: {
            id: 8,
            title: 'Rogue One: A Star Wars Story (2016)',
            imdb_id: 'tt3748528',
            year: "2016",
            image: "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_Ratio0.6762_AL_.jpg",
            plot: "In a time of conflict, a group of unlikely heroes band together on a mission to steal the plans to the Death Star, the Empire's ultimate weapon of destruction.",
            stars: "Felicity Jones, Diego Luna, Alan Tudyk",
            contentRating: "PG-13",
	          imDbRating: "7.8",
            wikipedia: "https://en.wikipedia.org/wiki/Rogue_One",
            genres: "Action, Adventure, Sci-Fi",
            trailer: "https://www.imdb.com/video/vi830387737",
            grossUSA: "$533,539,991",
            grossWorldwide: "$1,058,682,142"
          },
          votes: [ { id: 19 }, { id: 27 }, { id: 62 }, { id: 80 }, { id: 120 } ]
        },
        {
          id: 9,
          movie_id: 9,
          movie: {
            id: 9,
            title: 'Star Wars Episode VII - The Force Awakens (2015)',
            imdb_id: 'tt2488496',
            year: "2015",
            image: "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_Ratio0.6762_AL_.jpg",
            plot: "As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, an ex-stormtrooper, must join Han Solo and Chewbacca to search for the one hope of restoring peace.",
            stars: "Daisy Ridley, John Boyega, Oscar Isaac",
            contentRating: "PG-13",
	          imDbRating: "7.8",
            wikipedia: "https://en.wikipedia.org/wiki/Star_Wars:_The_Force_Awakens",
            genres: "Action, Adventure, Sci-Fi",
            trailer: "https://www.imdb.com/video/vi2762323481",
            grossUSA: "$936,662,225",
            grossWorldwide: "$2,071,310,218"
          },
          votes: [
            { id: 24 },
            { id: 29 },
            { id: 64 },
            { id: 66 },
            { id: 84 },
            { id: 104 }
          ]
        }
      ]
    }
    
    

    res.render('vote', { userInfo, css, poll, comments });
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