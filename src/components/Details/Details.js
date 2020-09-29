import React from 'react';
// import { AiOutlineUserAdd } from 'react-icons/ai';
// import { MdModeEdit } from 'react-icons/md';
import './Details.css';

const Details = ({ users, room, file }) => (
  <div className="detail">
    <div className="header">
      <p className="title">{room}</p>
      {/* <button className="invite" type="button">
        <AiOutlineUserAdd className="icon" />
        <span> Invite </span>
      </button> */}
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
              {users.map(({ name, colorCode }) => (
                <div key={name} className="item">
                  <img src={`https://ui-avatars.com/api/?name=${name}?&length=1&rounded=true&size=20&background=${colorCode}&color=f6f6f6`} alt="avatar" />
                  <p className="username">
                    {' '}
                    {name}
                    {' '}
                  </p>
                  {/* <button type="button" className="edit">
                    <MdModeEdit />
                  </button> */}
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
      <div className="media">
        <div className="item">
          {file && <img className="thumb" src={file ? URL.createObjectURL(file) : null} alt={file ? file.name : null} />}
        </div>
      </div>
    </div>
  </div>
);

export default Details;
