import React from 'react';
import '../../css/main.css';
import './Menu.css';
import { BsArrowReturnLeft } from 'react-icons/bs';

const Menu = () => (
  <div className="menu">
    <label className="switch">
      <input type="checkbox"/>
      <span className="slider"></span>
    </label>
    <a href="/" className="return"><BsArrowReturnLeft className="icon"/></a>

  </div>
);

export default Menu;