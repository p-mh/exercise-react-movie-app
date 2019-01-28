import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <h1>Movies App</h1>
      </Link>
    </div>
  );
}
