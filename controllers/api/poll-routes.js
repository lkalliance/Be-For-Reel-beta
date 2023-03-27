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
        // This works to find and create if not there
        const newMovie = await req.body.films.map(element => {
            Movie.findOrCreate({
                where: { imdb_id: element.imdb_id },
                defaults: {
                    image: element.image,
                    title: element.title,
                }
            }).then(([row, created]) => {
            console.log(element.imdb_id);
            console.log("movie id", row.dataValues.id);
            console.log(created);
            return row.dataValues.id;
            });
        });

        // creates the poll
        const newPoll = await Poll.create({
            title: req.body.title,
            description: req.body.desc,
            user_id: req.session.userId,
        });
        
        console.log("poll id ", newPoll.dataValues.id);

        // shows undefined
        console.log(newMovie);

        // tried for each loop does not create data in the movies while searching
        // const newOpts = await req.body.films.map(element => {
        //     console.log(element.imdb_id);
        //     const newMovie = Movie.findOne({
        //         where: {
        //             imdb_id: element.imdb_id,
        //         },
        //     })
        //     console.log(element.imdb_id, 'search');
        //     if (!newMovie) {
        //         // Movie.create({
        //         //     ...element,
        //     // });
        //     console.log(element.imdb_id, "not found");
        //     }            
        //     console.log(newMovie, "newmovie");            
        // });
        // console.log(newOpts, "newopts");

        // pushes data in the movie 
        // const newMovie = await req.body.films.forEach(element => {
        //     Movie.create ({
        //         ...element,
        //     });
        // })
        // console.log(newMovie);

        // works for finding and adding movies
        // const newMovie = await req.body.films.map(element => { 
        //     const movieId = Movie.findOrCreate({
        //         where: { imdb_id: element.imdb_id },
        //         defaults: {
        //             image: element.image,
        //             title: element.title,
        //         }
        //     });
        //     console.log(element.imdb_id);
        // });
       

        res.json(newPoll.dataValues.id);
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