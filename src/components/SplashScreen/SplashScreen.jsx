// src/components/SplashScreen.js
import React from 'react';
import './SplashScreen.css'; // Create this CSS file for styling
import logo from '../../assets/pie-chart.png';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default SplashScreen;
