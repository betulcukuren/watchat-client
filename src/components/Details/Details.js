import React from 'react';
import { FaEdit } from 'react-icons/fa';
import './Details.css';

const Details = ({ users, room }) => (
  <div className="detail">
    <div className="header">
      <p className="title">
        {room}
        {' '}
        <button type="button"><FaEdit /></button>
      </p>
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
                  <button type="button"><FaEdit className="icon" /></button>
                </div>
              ))}
            </div>
          )
          : null
        }
  </div>
);

export default Details;
