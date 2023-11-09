import React, { useState } from 'react';
import './Navbar.css'; // Make sure to import the CSS file

import politoLogo from '../../assets/politoLogo.png';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={politoLogo} className='logo'/>
      </div>
      <ul className={`nav-links ${isMobile && "mobile"}`}>
        
        <li><a href="/academics">Academics</a></li>
        <li><a href="/thesis">Thesis</a></li>
        <li><a href="/innovation">Innovation</a></li>
        
        <li><button className="login-button">Login</button></li>
      </ul>
      <button className="mobile-nav-toggle" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? 'x' : '≡'}
      </button>
    </nav>
  );
};

export default Navbar;
