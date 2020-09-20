import React from 'react';
import '../../css/main.css';
import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">X</a>
    </div>
  </div>
);

export default InfoBar;