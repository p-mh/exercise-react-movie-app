import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getNowPlayingMoviesDatas } from '../services/APIcalls';

import './home.css';

export default class Home extends Component {
  state = {
    movies: null,
  };
  componentDidMount() {
    this.addMoviesInState();
  }
  async addMoviesInState() {
    const {
      data: { results: movies },
    } = await getNowPlayingMoviesDatas();
    this.setState({
      movies,
    });
  }
  render() {
    if (!this.state.movies) {
      return <p>Loading</p>;
    }

    const moviesMapped = this.state.movies.map(
      ({ id, title, release_date, poster_path }) => (
        <div className="movie " key={id}>
          <Link to={`/movie/${id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt={title}
            />
            <div className="movie-infos">
              <h2>{title}</h2>
              <p>{release_date}</p>
            </div>
          </Link>
        </div>
      )
    );
    return (
      <div className="home">
        <div className="latest-movies">{moviesMapped}</div>
      </div>
    );
  }
}
