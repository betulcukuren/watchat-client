import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdExitToApp, MdCheck } from 'react-icons/md';
import { FiShare2 } from 'react-icons/fi';
import Toggles from '../Toggles';
import './Details.css';

const Details = ({
  users, name, changeUsername,
  check, setCheck, toggleTheme,
  theme, toggleNotification, soundChoice,
}) => {
  const [newName, setNewName] = useState('');

  const editUserName = () => {
    const element = document.getElementById('self');
    element.contentEditable = 'true';
    element.focus();
    setCheck(true);
  };

  const setName = () => {
    const element = document.getElementById('self');
    setNewName(element.innerHTML);
  };

  return (
    <div className="detail" id="detailMenu">
      <div className="header" id="detailHeader">
        <div className="settings" id="mainSettings">
          <Toggles
            toggleTheme={toggleTheme}
            theme={theme}
            toggleNotification={toggleNotification}
            soundChoice={soundChoice}
          />
        </div>
        <div className="title" id="roomTitle">
          <button type="button" className="shareBtn" id="shareBtn"><FiShare2 /></button>
        </div>
      </div>
      {
        users
          ? (
            <div className="users" id="userList">
              {users.map(({ name: username }) => (
                <div key={username} className="item">

                  { username === name
                    ? (
                      <div className="user">
                        <p
                          id="self"
                          onBlur={setName}
                        >
                          {' '}
                          {username}
                          {' '}
                        </p>
                        <button
                          type="button"
                          onClick={
                               check
                                 ? (() => { changeUsername(newName); })
                                 : (editUserName)
                                }
                        >
                          {check
                            ? <MdCheck className="icon" />
                            : <FaEdit className="icon" />}
                        </button>
                      </div>
                    )
                    : (
                      (
                        <div className="user">
                          <p>
                            {' '}
                            {username}
                            {' '}
                          </p>
                        </div>
                      ))}
                </div>
              ))}
            </div>
          )
          : null
        }
      <a href="/" className="return"><MdExitToApp className="icon" /></a>
    </div>
  );
};
export default Details;
