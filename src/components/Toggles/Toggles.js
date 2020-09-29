import React from 'react';
import { RiMoonLine, RiMoonFill } from 'react-icons/ri';
import { MdNotificationsNone, MdNotificationsOff } from 'react-icons/md';
import './Toggles.css';

const Toggles = ({
  toggleTheme, theme, soundChoice, toggleNotification,
}) => (
  <div className="toggles">
    <button type="button" className="toggle" onClick={toggleTheme}>
      {
                theme === 'light'
                  ? (<RiMoonLine />)
                  : (<RiMoonFill />)
            }
    </button>
    <button type="button" className="toggle" onClick={toggleNotification}>
      {
                soundChoice === true
                  ? (<MdNotificationsNone />)
                  : (<MdNotificationsOff />)
            }
    </button>
  </div>
);

export default Toggles;
