import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { searchMovie } from '../services/APIcalls';

import './searchbar.css';

const resetSearchState = {
  inputValue: '',
  results: [],
  highlightedIndex: 0,
};

const stepHighlightedIndex = step => ({ highlightedIndex }) => ({
  highlightedIndex: highlightedIndex + step,
});

class Searchbar extends Component {
  state = resetSearchState;
  async addSearchMovieDataInState(query) {
    const {
      data: { results },
    } = await searchMovie(query);
    this.setState({
      results: results.slice(0, 10),
    });
  }
  inputChange = ({ target: { value } }) => {
    this.setState(
      {
        inputValue: value,
      },
      () => {
        if (this.state.inputValue) {
          this.addSearchMovieDataInState(this.state.inputValue);
        }
      }
    );
  };

  changePage(id) {
    this.props.history.push(`/movie/${id}`);
    this.setState(resetSearchState);
  }

  resetStateDatasAndChangePage(id, e) {
    e.preventDefault();
    this.changePage(id);
  }

  onKeyDown = e => {
    const { results, highlightedIndex } = this.state;
    if (e.key === 'Enter') {
      this.changePage(results[highlightedIndex].id);
      return false;
    }
    if (
      (e.key === 'ArrowUp' && highlightedIndex === 0) ||
      (e.key === 'ArrowDown' && highlightedIndex >= results.length - 1)
    ) {
      return false;
    }
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
      const step = e.key === 'ArrowDown' ? 1 : -1;
      this.setState(stepHighlightedIndex(step));
      return false;
    }
  };

  onMouseOver = id => {
    this.setState({
      highlightedIndex: id,
    });
  };

  render() {
    const { results, inputValue } = this.state;
    const resultsMapped = inputValue
      ? results.map(({ id, title }, index) => (
          <a
            key={id}
            href={`/movie/${id}`}
            onClick={this.resetStateDatasAndChangePage.bind(this, id)}
            onMouseEnter={this.onMouseOver.bind(this, index)}
          >
            <p
              className={
                index === this.state.highlightedIndex ? 'highlited' : ''
              }
            >
              {title}
            </p>
          </a>
        ))
      : null;

    return (
      <div className="searchbar">
        <i className="fas fa-search" />
        <input
          type="text"
          placeholder="Search a movie"
          value={inputValue}
          onChange={e => this.inputChange(e)}
          onKeyDown={this.onKeyDown}
        />
        <div className="results">{resultsMapped}</div>
      </div>
    );
  }
}

export default withRouter(Searchbar);
