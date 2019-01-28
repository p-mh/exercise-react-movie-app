import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPeopleInfos, getPeopleMovies } from '../services/APIcalls';

import './people.css';

export default class People extends Component {
  state = {
    infos: null,
    movies: null,
  };
  componentDidMount() {
    const { peopleId } = this.props.match.params;
    this.addAllInfosInState(peopleId);
  }

  addAllInfosInState(id) {
    this.addInfosInState(id);
    this.addMoviesInState(id);
  }

  async addInfosInState(peopleId) {
    const { data } = await getPeopleInfos(peopleId);
    this.setState({
      infos: data,
    });
  }
  async addMoviesInState(peopleId) {
    const {
      data: { cast },
    } = await getPeopleMovies(peopleId);
    this.setState({
      movies: cast.slice(0, 5),
    });
  }

  render() {
    if (!this.state.infos || !this.state.movies) {
      return <div />;
    }

    const {
      name,
      birthday,
      deathday,
      biography,
      profile_path,
    } = this.state.infos;

    const moviesMapped = this.state.movies.map(({ id, poster_path, title }) => (
      <div className="movie" key={id}>
        <Link to={`/movie/${id}`}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300${poster_path}`
                : 'http://via.placeholder.com/300x450'
            }
            alt={title}
          />
        </Link>
        <p>{title}</p>
      </div>
    ));

    return (
      <div className="people">
        <div className="infos">
          <div className="img-people">
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w300${profile_path}`
                  : 'http://via.placeholder.com/300x450'
              }
              alt={name}
            />
          </div>

          <div className="text-infos">
            <h1>{name}</h1>
            <div>
              <b>Birthday:</b> {birthday}
            </div>
            <div>
              <b>{deathday ? `Deathday: ` : ''}</b>
              {deathday}
            </div>
            <div className="biography">{biography}</div>
          </div>
        </div>

        <div className="movies">
          <h2>Movies</h2>
          <div className="movies-bloc">{moviesMapped}</div>
        </div>
      </div>
    );
  }
}
