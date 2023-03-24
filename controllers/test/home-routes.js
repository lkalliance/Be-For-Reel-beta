const router = require('express').Router();
const { User, Poll, Movie } = require('../../models');
const isAuth = require('../../utils/auth');
const fetch = require('axios');


router.get('/', async (req, res) => {
  // Sample
  try {
    
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }

    const css = { url: '/css/homepage.css' }
    const today = { year: new Date().getFullYear() }


    const polls = [{
      id: 1,
      title: 'What is your favorite Pirates of the Caribbean movie?',
      description: "This is a great description of this poll. I don't think it's possible to write a better one. I'm very impressed with myself. The code is more what you would call guidelines than actual rules.",
      user: { id: 1, username: 'UserOne' },
      movies: [ 1, 2, 3 ],
      poster: 'https://m.media-amazon.com/images/M/MV5BMjIyNjkxNzEyMl5BMl5BanBnXkFtZTYwMjc3MDE3._V1_Ratio0.6762_AL_.jpg',
    },
    {
      id: 2,
      title: 'What is your favorite Star Wars movie?',
      description: "This is a great description of this poll. I don't think it's possible to write a better one. I'm very impressed with myself. May the Force be with you.",
      user: { id: 1, username: 'UserOne' },
      movies: [ 1, 2, 3 ],
      poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_Ratio0.6762_AL_.jpg',
    },
    {
      id: 3,
      title: 'Which film should have won Best Picture in 1990?',
      description: 'I think they screwed the pooch. Which should have won?',
      user: { id: 2, username: 'UserTwo' },
      movies: [ 1, 2, 3 ],
      poster: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.6762_AL_.jpg',
    },
    {
      id: 4,
      title: 'Which film should have won Best Picture in 1994?',
      description: "Did they get it right? I kinda think they did, but a lot of people don't. What do you think?",
      user: { id: 2, username: 'UserTwo' },
      movies: [ 1, 2, 3 ],
      poster: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6904_AL_.jpg',
    },
    {
      id: 5,
      title: 'Which film should have won Best Picture in 1977?',
      description: 'OK, come on. I know you have an opinion on this, right? Everyone does. Which should have won?',
      user: { id: 2, username: 'UserTwo' },
      movies: [ 1, 2, 3 ],
      poster: 'https://m.media-amazon.com/images/M/MV5BZDg1OGQ4YzgtM2Y2NS00NjA3LWFjYTctMDRlMDI3NWE1OTUyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_Ratio0.6762_AL_.jpg',
    },
    {
      id: 6,
      title: 'What is your favorite Batman movie?',
      description: "I'm Batman.\n" +
        '\n' +
        "No, wait, I'm not actually. But several other guys have been. Pick one!",
      user: { id: 4, username: 'UserFour' },
      movies: [ 1, 2, 3 ],
      poster: 'https://m.media-amazon.com/images/M/MV5BZDNjOGNhN2UtNmNhMC00YjU4LWEzMmUtNzRkM2RjN2RiMjc5XkEyXkFqcGdeQXVyMTU0OTM5ODc1._V1_Ratio0.6762_AL_.jpg',
    }
  ]
    

    res.render('homepage', { userInfo, css, today, polls });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); 


module.exports = router;
