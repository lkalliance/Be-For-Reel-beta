const router = require('express').Router();
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');
const { User, Movie, Poll, Vote, Comment, Opt } = require('../../models');

//  add the withAuth to request when finished

// /create for the poll
// create multi functions for each create poll, movie, options
// then post route with try the multi awaits
router.post('/create', async (req, res) => {
    console.log("hi");
    console.log(req.body);
    try {
        const newPoll = await Poll.create({
            title: req.body.title,
            description: req.body.desc,
            user_id: req.session.userId,
        });
        // const opts = await Opt.bulkCreate({
        //  const movies = await Movie.findOne({
        //     where: {
        //         imbd_id: req.body.films
        //     }            
        //  });

        // });
        console.log(newPoll);
        res.json();
    }  catch (err) {
        res.status(500).json(err);
    }
});


// /vote/[option#] for voting

// router.post('/vote/:opt_id/:poll_id', async (req, res) => {
//     const vote = req.body
//     try {

//         res.json();
//     }  catch (err) {
//         res.status(500).json(err);
//     }
// });


module.exports = router;