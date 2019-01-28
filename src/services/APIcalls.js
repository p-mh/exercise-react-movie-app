import axios from 'axios';

const API_KEY = 'f749d1b2b98ab3a8a528ced6704bbb4e';

const getNowPlayingMoviesDatas = () =>
  axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  );

const getMovieInfos = movieId =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );

const getMovieCredits = movieId =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
  );

const searchMovie = query =>
  axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );

const getPeopleInfos = peopleId =>
  axios.get(
    `https://api.themoviedb.org/3/person/${peopleId}?api_key=${API_KEY}&language=en-US`
  );

const getPeopleMovies = peopleId =>
  axios.get(
    `https://api.themoviedb.org/3/person/${peopleId}/movie_credits?api_key=${API_KEY}&language=en-US`
  );

export {
  getNowPlayingMoviesDatas,
  getMovieInfos,
  getMovieCredits,
  searchMovie,
  getPeopleInfos,
  getPeopleMovies,
};
