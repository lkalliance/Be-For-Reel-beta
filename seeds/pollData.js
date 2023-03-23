const { Comment } = require('../models');

const commentdata = [
  {
    content: 'This is the funniest thing ever made up on the fly.',
    user_id: '1',
    post_id: '6',
  },
  {
    content: 'This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment.',
    user_id: '1',
    post_id: '2',
  },
  {
    content: 'First!',
    user_id: '5',
    post_id: '1',
  },
  {
    content: 'Second!',
    user_id: '4',
    post_id: '1',
  },
  {
    content: 'Type much?',
    user_id: '3',
    post_id: '7',
  },
  {
    content: `You know, I think I would find this more entertaining if I spoke latin.`,
    user_id: '2',
    post_id: '2',
  },
  {
    content: `I've frankly run out of ideas for comments`,
    user_id: '1',
    post_id: '8',
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
