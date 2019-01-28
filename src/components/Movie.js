import React from 'react';
import { Link } from 'react-router-dom';
import { getMovieInfos, getMovieCredits } from '../services/APIcalls';

import './movie.css';

export default class Movie extends React.Component {
  state = {
    movieInfos: null,
    movieCast: null,
  };
  componentWillReceiveProps(nextProps) {
    this.addAllInfosInState(nextProps.match.params.movieId);
  }
  componentDidMount() {
    this.addAllInfosInState(this.props.match.params.movieId);
  }

  addAllInfosInState(id) {
    this.addMovieInfosInState(id);
    this.addMovieCastInState(id);
  }

  async addMovieInfosInState(movieId) {
    const { data } = await getMovieInfos(movieId);
    this.setState({
      movieInfos: data,
    });
  }
  async addMovieCastInState(movieId) {
    const {
      data: { cast },
    } = await getMovieCredits(movieId);
    this.setState({
      movieCast: cast.slice(0, 5),
    });
  }
  render() {
    const { movieInfos, movieCast } = this.state;
    if (!movieInfos || !movieCast) {
      return <div />;
    }

    const {
      title,
      poster_path,
      release_date,
      vote_average,
      vote_count,
      overview,
      genres,
    } = movieInfos;

    const genreMapped = genres.map(({ name }) => name + ' ');
    const castMapped = movieCast.map(({ id, name, profile_path }) => (
      <div key={id} className="actor">
        <Link to={`/people/${id}`}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w300${profile_path}`
                : 'http://via.placeholder.com/300x450'
            }
            alt={name}
          />
        </Link>
        <p>{name}</p>
      </div>
    ));

    return (
      <div className="movieInfos">
        <div className="infos">
          <div className="img-movie">
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w300${poster_path}`
                  : 'http://via.placeholder.com/300x450'
              }
              alt={title}
            />
          </div>
          <div className="text-infos">
            <h1>{title}</h1>
            <div>
              <b>Release date:</b> {release_date}
            </div>
            <div>
              <b>Rating:</b> {vote_average}
            </div>
            <div>
              <b>Vote count:</b> {vote_count}
            </div>
            <div>
              <b>Genres:</b> {genreMapped}
            </div>
            <div className="overview">{overview}</div>
          </div>
        </div>

        <div className="cast">
          <h2>Cast</h2>
          <div className="cast-bloc">{castMapped}</div>
        </div>
      </div>
    );
  }
}
