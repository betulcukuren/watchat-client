import React from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { MdTimer, MdOndemandVideo, MdPersonalVideo } from 'react-icons/md';

import './Menu.css';

const Menu = ({ setOpenMenu }) => (
  <div className="menu">
    <div className="tools">
      <a href="/" className="tool"><MdTimer className="icon" /></a>
      <button
        className="tool"
        onClick={setOpenMenu(true)}
        type="button"
      >
        <MdOndemandVideo className="icon" />
      </button>
      <a href="/" className="tool"><MdPersonalVideo className="icon" /></a>
    </div>
    <a href="/" className="return"><BsArrowReturnLeft className="icon" /></a>
  </div>
);

export default Menu;
