const { Movie } = require('../models');

const movieData = [
  {
    imdb_id: "tt0449088",
    title: "Pirates of the Caribbean: At World's End (2007)",
    image: "https://m.media-amazon.com/images/M/MV5BMjIyNjkxNzEyMl5BMl5BanBnXkFtZTYwMjc3MDE3._V1_Ratio0.6757_AL_.jpg"
  },
  {
    imdb_id: "tt0383574",
    title: "Pirates of the Caribbean: Dead Man's Chest (2006)",
    image: "https://m.media-amazon.com/images/M/MV5BMTcwODc1MTMxM15BMl5BanBnXkFtZTYwMDg1NzY3._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt1298650",
    title: "Pirates of the Caribbean: On Stranger Tides (2011)",
    image: "https://m.media-amazon.com/images/M/MV5BMjE5MjkwODI3Nl5BMl5BanBnXkFtZTcwNjcwMDk4NA@@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt1790809",
    title: "Pirates of the Caribbean: Dead Men Tell No Tales (2017)",
    image: "https://m.media-amazon.com/images/M/MV5BMTYyMTcxNzc5M15BMl5BanBnXkFtZTgwOTg2ODE2MTI@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt0325980",
    title: "Pirates of the Caribbean: The Curse of the Black Pearl (2003)",
    image: "https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt0076759",
    title: "Star Wars Episode IV - A New Hope (1977)",
    image: "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt0080684",
    title: "Star Wars Episode V - The Empire Strikes Back (1983)",
    image: "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt3748528",
    title: "Rogue One: A Star Wars Story (2016)",
    image: "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt2488496",
    title: "Star Wars Episode VII - The Force Awakens (2015)",
    image: "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt0099685",
    title: "Goodfellas (1990)",
    image: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt0099348",
    title: "Dances with Wolves (1990)",
    image: "https://m.media-amazon.com/images/M/MV5BMTY3OTI5NDczN15BMl5BanBnXkFtZTcwNDA0NDY3Mw@@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt0109830",
    title: "Forrest Gump (1994)",
    image: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6904_AL_.jpg"
  },
  {
    imdb_id: "tt0110912",
    title: "Pulp Fiction (1994)",
    image: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.6904_AL_.jpg"
  },
  {
    imdb_id: "tt0075686",
    title: "Annie Hall",
    image: "https://m.media-amazon.com/images/M/MV5BZDg1OGQ4YzgtM2Y2NS00NjA3LWFjYTctMDRlMDI3NWE1OTUyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt0096895",
    title: "Batman (1989)",
    image: "https://m.media-amazon.com/images/M/MV5BZDNjOGNhN2UtNmNhMC00YjU4LWEzMmUtNzRkM2RjN2RiMjc5XkEyXkFqcGdeQXVyMTU0OTM5ODc1._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt0468569",
    title: "The Dark Knight (2008)",
    image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt2975590",
    title: "Batman v. Superman: Dawn of Justice (2016)",
    image: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt1877830",
    title: "The Batman (2022)",
    image: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt3104988",
    title: "Crazy Rich Asians (2018)",
    image: "https://m.media-amazon.com/images/M/MV5BMTYxNDMyOTAxN15BMl5BanBnXkFtZTgwMDg1ODYzNTM@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt0838283",
    title: "Step Brothers (2008)",
    image: "https://m.media-amazon.com/images/M/MV5BODViZDg3ZjYtMzhiYS00YTVkLTk4MzktYWUxMTlkYjc1NjdlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt1119646",
    title: "The Hangover (2009)",
    image: "https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt0443453",
    title: "Borat (2006)",
    image: "https://m.media-amazon.com/images/M/MV5BMTk0MTQ3NDQ4Ml5BMl5BanBnXkFtZTcwOTQ3OTQzMw@@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt0990407",
    title: "The Green Hornet (2011)",
    image: "https://m.media-amazon.com/images/M/MV5BYjlhN2U3OWUtNThiNi00ZWRhLWFlZDktOTcyMDk0NmM1OTA4XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_Ratio0.6762_AL_.jpg"
  },
  {
    imdb_id: "tt11813216",
    title: "The Banshees of Inisherin (2022)",
    image: "https://m.media-amazon.com/images/M/MV5BM2NlZDI0ZDktNTg5OS00ZjQ1LWI4MDEtN2I0MDE5NWRiNzA4XkEyXkFqcGdeQXVyMTY5Nzc4MDY@._V1_Ratio0.6762_AL_.jpg"
  }
  
];

const seedMovie = () => Movie.bulkCreate(movieData);

module.exports = seedMovie;
