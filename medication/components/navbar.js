// components/Navbar.js

import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css'; // Import the CSS module

const Navbar = () => {
    return (
        <div className="navbar">
          <div className="navbar-container">
            <Link href="/history" className="history-button">
                History
            </Link>
          </div>
        </div>
      );
    };
    

export default Navbar;
