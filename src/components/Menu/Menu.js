import React from 'react';
import '../../css/main.css';
import './Menu.css';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { MdTimer, MdOndemandVideo, MdPersonalVideo } from 'react-icons/md';

const Menu = () => (
  <div className="menu">
    <label className="switch">
      <input type="checkbox"/>
      <span className="slider"></span>
    </label>
    <div class="tools">
      <a href="/" className="tool"><MdTimer className="icon"/></a>
      <a href="/" className="tool"><MdOndemandVideo className="icon"/></a>
      <a href="/" className="tool"><MdPersonalVideo className="icon"/></a>
    </div>
    <a href="/" className="tool return"><BsArrowReturnLeft className="icon"/></a>
  </div>
);

export default Menu;