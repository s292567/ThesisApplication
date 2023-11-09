import React from 'react';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <header className="page-not-found-header">
        <>{/* HERE THERE WILL BE THE MAIN NAVBAR */ }</>
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
