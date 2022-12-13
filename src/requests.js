const API_KEY = "8b263a52fe5718b07d46fadbe8b6cb66";
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=e`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_net`,

  fetTopRatedMovies: `movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,

  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=1&with_genres=28&page=1`,

  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=1&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=1&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=1&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=1&with_genres=99`,
};

export default requests;
