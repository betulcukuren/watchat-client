import React from 'react';
import '../../css/main.css';
import './Menu.css';
import { VscGithub } from 'react-icons/vsc';


const Menu = () => (
  <div className="menu">
    <label class="switch">
      <input type="checkbox"/>
      <span class="slider"></span>
    </label>
    <a href="https://github.com/betulgundogdu"><VscGithub/></a>
  </div>
);

export default Menu;