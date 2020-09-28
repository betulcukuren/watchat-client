import React from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import './Details.css';

const TextContainer = ({ users, room }) => (
  <div className="detail">
    <div className="header">
      <p className="title">{room}</p>
      <button className="invite" type="button">
        <AiOutlineUserAdd className="icon" />
        <span> Invite </span>
      </button>
    </div>
    <p className="count">
      {users.length}
      {' '}
      people joined
    </p>
    {
        users
          ? (
            <div className="users">
              {users.map(({ name, colorCode }) => (
                <div key={name} className="item">
                  <img src={`https://ui-avatars.com/api/?name=${name}?&length=1&rounded=true&size=20&background=${colorCode}&color=f6f6f6`} alt="avatar" />
                  <p style={{ color: `#${colorCode}` }}>
                    {' '}
                    {name}
                    {' '}
                  </p>
                </div>
              ))}
            </div>
          )
          : null
        }

    <div className="attachments">
      <div className="sections">
        <button type="button">Files</button>
        <button type="button">Media</button>
        <button type="button">Links</button>
      </div>
    </div>
  </div>
);

export default TextContainer;
