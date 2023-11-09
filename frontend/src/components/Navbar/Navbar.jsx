import React, { useState } from 'react';
import './Navbar.css'; // Make sure to import the CSS file

import politoLogo from '../../assets/politoLogo.png';

const Navbar = () => {
  const [isMobileViewClicked, setisMobileViewClicked] = useState(false);

  return (
    <nav className={`navbar ${isMobileViewClicked ? 'navbarMobile-clicked' : ''}`}>
      <div>
        <img src={politoLogo} className='logo'/>
      </div>
      <ul className={`nav-links ${isMobileViewClicked && "mobile"}`}>
        
        <li><a href="/academics">Academics</a></li>
        <li><a href="/thesis">Thesis</a></li>
        <li><a href="/innovation">Innovation</a></li>
        
        <li><button className="login-button">Login</button></li>
      </ul>
      <button className="mobile-nav-toggle" onClick={() => setisMobileViewClicked(!isMobileViewClicked)}>
        {isMobileViewClicked ? 'x' : '≡'}
      </button>
    </nav>
  );
};

export default Navbar;
