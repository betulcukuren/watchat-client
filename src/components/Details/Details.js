import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';
import { FiShare2 } from 'react-icons/fi';

import './Details.css';

const Details = ({
  users, roomName, name, changeUsername,
}) => {
  const editUserName = () => {
    const element = document.getElementById('self');
    element.contentEditable = 'true';
    changeUsername(element.innerHTML);
  };

  return (
    <div className="detail">
      <div className="header">
        <div className="title">
          <p id="title">
            {roomName}
            {' '}
          </p>
          <button type="button" className="shareBtn"><FiShare2 /></button>
        </div>
        <p className="count">
          {users.length}
          {' '}
          people joined
        </p>
      </div>
      {
        users
          ? (
            <div className="users">
              {users.map(({ name: username, colorCode }) => (
                <div key={username} className="item">
                  <img src={`https://ui-avatars.com/api/?name=${username}?&length=1&rounded=true&size=20&background=${colorCode}&color=f6f6f6`} alt="avatar" />

                  { username === name
                    ? (
                      <div className="user">
                        <p
                          id="self"
                          onBlur={(e) => { changeUsername(e.currentTarget.innerHTML); }}
                        >
                          {' '}
                          {username}
                          {' '}
                        </p>
                        <button type="button" onClick={editUserName}><FaEdit className="icon" /></button>
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
