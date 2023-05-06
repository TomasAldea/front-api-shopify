import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mdl-footer">
      <div className='container'>
        <div className="mdl-footer-content">
          <p>&copy; {new Date().getFullYear()} Tomás Aldea Moral</p>
        </div>
        <Link to="https://tomasaldea.com/" target="_blank" rel="noopener noreferrer">Portfolio ➞</Link>
      </div>
    </footer>
  );
}
