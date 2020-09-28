import React from 'react';
import {RiMoonLine, RiMoonFill} from 'react-icons/ri';
import {MdNotificationsNone, MdNotificationsOff} from 'react-icons/md';
import './Toggles.css';

const Toggles = ({toggleTheme, theme, notification, toggleNotification}) => {
    return(
        <div className="toggles">
            <button className="toggle" onClick={toggleTheme}>
            {
                theme === 'light'
                ? (<RiMoonLine/>)
                : (<RiMoonFill/>)
            }
            </button>
            <button className="toggle" onClick={toggleNotification}>
            {
                notification === true
                ? (<MdNotificationsNone/>)
                : (<MdNotificationsOff/>)
            }
            </button>
        </div>
    );
}

export default Toggles;