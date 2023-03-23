const { Movie } = require('../models');

const movieData = [
  {
    imdb_id: "tt0449088",
    title: "Pirates of the Caribbean: At World's End (2007)"
  },
  {
    imdb_id: "tt0383574",
    title: "Pirates of the Caribbean: Dead Man's Chest (2006)"
  },
  {
    imdb_id: "tt1298650",
    title: "Pirates of the Caribbean: On Stranger Tides (2011)"
  },
  {
    imdb_id: "tt1790809",
    title: "Pirates of the Caribbean: Dead Men Tell No Tales (2017)"
  },
  {
    imdb_id: "tt0325980",
    title: "Pirates of the Caribbean: The Curse of the Black Pearl (2003)"
  },
  {
    imdb_id: "tt0076759",
    title: "Star Wars Episode IV - A New Hope (1977)"
  },
  {
    imdb_id: "tt0080684",
    title: "Star Wars Episode V - The Empire Strikes Back (1983)"
  },
  {
    imdb_id: "tt3748528",
    title: "Rogue One: A Star Wars Story (2016)"
  },
  {
    imdb_id: "tt2488496",
    title: "Star Wars Episode VII - The Force Awakens (2015)"
  },
  {
    imdb_id: "tt0099685",
    title: "Goodfellas (1990)"
  },
  {
    imdb_id: "tt0099348",
    title: "Dances with Wolves (1990)"
  },
  {
    imdb_id: "tt0109830",
    title: "Forrest Gump (1994)"
  },
  {
    imdb_id: "tt0110912",
    title: "Pulp Fiction (1994)"
  },
  {
    imdb_id: "tt0075686",
    title: "Annie Hall"
  },
  {
    imdb_id: "tt0096895",
    title: "Batman (1989)"
  },
  {
    imdb_id: "tt0468569",
    title: "The Dark Knight (2008)"
  },
  {
    imdb_id: "tt2975590",
    title: "Batman v. Superman: Dawn of Justice (2016)"
  },
  {
    imdb_id: "tt1877830",
    title: "The Batman (2022)"
  },
  {
    imdb_id: "tt3104988",
    title: "Crazy Rich Asians (2018)"
  },
  {
    imdb_id: "tt0838283",
    title: "Step Brothers (2008)"
  },
  {
    imdb_id: "tt1119646",
    title: "The Hangover (2009)"
  },
  {
    imdb_id: "tt0443453",
    title: "Borat (2006)"
  },
  {
    imdb_id: "tt0990407",
    title: "The Green Hornet (2011)"
  },
  {
    imdb_id: "tt11813216",
    title: "The Banshees of Inisherin (2022)"
  }
  
];

const seedMovie = () => Movie.bulkCreate(movieData);

module.exports = seedMovie;
