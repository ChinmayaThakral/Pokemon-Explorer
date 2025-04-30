import React from 'react';
import './Header.css';
import { useState } from 'react';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <header className="header">
      <h1>Assignment 1 - Pokémon Explorer</h1>
    </header>
  );
};

export default Header; 