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
    comment: "Putting in a comment here, just to be different."
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "Comments can be much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much much longer than one sentence."
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: `Let's pretend I put a really long review here. Like really long. Like longer. Still longer. Still longer. Still longer. Still longer. Still longer. Still longer. Still longer. Still longer. Still longer. Still longer. Still longer. Still longer. Still longer. Still longer. Still longer. Still longer. Still longer.
    
    And with a second paragraph. That's right, two paragraphs, why not?`
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "Comment goes here"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "I get to comment? I get to express myself? That makes me very happy!"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "Yay for comments!"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "Comment! Boo-yah!"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "Let's go Twins! Let's go Twins! Let's go Twins! Let's go Twins! Let's go Twins! Let's go Twins! Let's go Twins! Let's go Twins! Let's go Twins! Let's go Twins!"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "I'm going to say something like a movie snob would. It will probably reference Martin Scorsese or maybe Francois Truffaut or Orson Welles or Federico Fellini or maybe even Stanley Kramer! But not Quentin Tarantino. Never Quentin Tarantino. Oh, wait, I meant Kubrick, not Kramer."
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "First!"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "Nth!"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "How am I going to explain this comment to my mother?"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "You like me! You really like me!"
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: "So, like, everyone can see this, right?"
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
  },
  {
    opt_id: Math.trunc((Math.random() * 25)) + 1,
    user_id: Math.trunc((Math.random() * 5)) + 1,
    comment: ""
  }
];

const seedVote = () => Vote.bulkCreate(voteData);

module.exports = seedVote;
