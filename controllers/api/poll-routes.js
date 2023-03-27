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

        res.json(newPoll.dataValues.id);
    }  catch (err) {
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