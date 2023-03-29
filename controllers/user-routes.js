const router = require("express").Router();
const isAuth = require("../utils/auth");
const { Poll, Opt, User, Movie, Vote } = require("../models");

router.get("/", async (req, res) => {
  // Getting a list of users
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
    };
    const css = { url: "/css/userList.css" };
    const today = new Date();
    const currentYear = { year: today.getFullYear() };

    const userData = await User.findAll({
      attributes: ["username", "id", "created_at"],
      order: [["username", "ASC"]],
    });
    const users = await userData.map((user) => user.get({ plain: true }));

    res.render("userList", { userInfo, css, currentYear, users });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // Render user profile
  try {
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
    };
    const today = new Date();
    const currentYear = { year: today.getFullYear() };
    const css = { url: "/css/userProfile.css" };

    const userData = await User.findByPk(req.params.id, {
      attributes: ["id", "username", "created_at"],
      include: [
        {
          model: Poll,
          attributes: ["id", "title", "created_at", "description"],
          include: {
            model: Vote,
            attributes: ["id", "comment"],
          },
        },
        {
          model: Vote,
          attributes: ["id", "comment", "created_at"],
          include: [
            {
              model: Poll,
              attributres: ["id", "title"],
            },
            {
              model: Opt,
              attributes: ["id"],
              include: {
                model: Movie,
                attributes: ["title"],
              },
            },
          ],
        },
      ],
    });
    const user = await userData.get({ plain: true });

    // count up the votes and comments for each poll
    for (poll of user.polls) {
      poll.totalVotes = poll.votes.length;
      let totalComments = 0;
      for (vote of poll.votes) {
        console.log(vote);
        if (vote.comment !== "") totalComments++;
      }
      poll.totalComments = totalComments;
    }

    // get a list of all the user's comments
    const comments = [];
    for (vote of user.votes) {
      if (vote.comment !== "") {
        comments.push({
          poll_id: vote.poll.id,
          poll_title: vote.poll.title,
          created_at: vote.created_at,
          movie: vote.opt.movie.title,
          content: vote.comment,
        });
      }
    }

    user.polls.sort(sortDates);

    function sortDates(a, b) {
      return b.created_at - a.created_at;
    }

    res.render("userProfile", { userInfo, css, currentYear, user, comments });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
