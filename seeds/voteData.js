const { Vote } = require('../models');

const voteData = [
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "I don't understand how anyone could have voted differently in this poll. The answer is obvious."
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "Did you know that that movie even existed? I didn't, and I don't know anyone that did."
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "OMG. Why."
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repudiandae adipisci temporibus deleniti unde atque molestiae error molestias at, fuga, enim ducimus magni iusto excepturi quaerat eum nemo eligendi eos fugit dolor!"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore dolor totam ad!"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "First!"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "Make money from home! I make $5,000 a  month placing tiny ads, in just two hours a week!"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque atque voluptates nisi, magni sint ad ipsam, saepe eaque officia quam delectus itaque accusamus similique tempora tempore voluptatibus! Praesentium eius ut quasi! Minus rerum voluptatum atque assumenda hic fugit cupiditate quisquam, provident ipsam harum explicabo amet expedita dolore ipsa, culpa facilis."
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "Huh?"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "This is a tough one. It took me quite some time to come up with the answer."
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  }
];

const seedVote = () => Vote.bulkCreate(voteData);

module.exports = seedVote;
