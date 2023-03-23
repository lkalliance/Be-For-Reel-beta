const { Poll } = require('../models');

const pollData = [
  {
    title: 'What is your favorite Pirates of the Caribbean movie?',
    description: "This is a great description of this poll. I don't think it's possible to write a better one. I'm very impressed with myself. The code is more what you would call guidelines than actual rules.",
    user_id: '1'
  },{
    title: 'What is your favorite Star Wars movie?',
    description: "This is a great description of this poll. I don't think it's possible to write a better one. I'm very impressed with myself. May the Force be with you.",
    user_id: '1'
  },{
    title: 'Which film should have won Best Picture in 1990?',
    description: "I think they screwed the pooch. Which should have won?",
    user_id: '2'
  },{
    title: 'Which film should have won Best Picture in 1994?',
    description: "Did they get it right? I kinda think they did, but a lot of people don't. What do you think?",
    user_id: '2'
  },{
    title: 'Which film should have won Best Picture in 1977?',
    description: "OK, come on. I know you have an opinion on this, right? Everyone does. Which should have won?",
    user_id: '2'
  },{
    title: 'What is your favorite Batman movie?',
    description: "I'm Batman.\n\nNo, wait, I'm not actually. But several other guys have been. Pick one!",
    user_id: '4'
  },{
    title: 'Which is the best comedy movie of this century?',
    description: "Ha ha ha ha ha ha ha hahahaha ha ha ha ha!!!",
    user_id: '3'
  }
]

const seedPoll = () => Poll.bulkCreate(pollData);

module.exports = seedPoll;
