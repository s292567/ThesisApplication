import React from 'react';
import './PageNotFound.css';
import Navbar from '../components/Navbar/Navbar';

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <header>
        <Navbar />
      </header>
      <main className="page-not-found-main">
        <div className="page-not-found-card">
          <h1>404</h1>
          <p>Sorry, the page you are looking for cannot be found.</p>
          <a href="/" className="page-not-found-home-link">Go back to homepage</a>
        </div>
      </main>
    </div>
  );
};

export default PageNotFound;
