import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Home from './components/Home';
import Movie from './components/Movie';
import People from './components/People';

import './App.css';
const App = () => (
  <BrowserRouter>
    <div className="app">
      <Header />
      <Searchbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/movie/:movieId" component={Movie} />
      <Route exact path="/people/:peopleId" component={People} />
    </div>
  </BrowserRouter>
);

export default App;
