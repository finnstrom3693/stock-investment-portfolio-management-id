// Navbar.js
import React from 'react';
import './Navbar.css';
import logo from '../../assets/pie-chart.png';
import flag from '../../assets/Flag_of_Indonesia.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bgnavbar shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="logo" width="30" height="30" className='me-2'/>
          <span className='navtext'>Stock Investment Portfolio Management</span>
          <img src={flag} alt="flag" width="30" height="30" className='me-2 ms-2'/>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
