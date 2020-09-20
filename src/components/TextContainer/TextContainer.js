import React from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';

import '../../css/main.css';
import './TextContainer.css';

const TextContainer = ({ users, room }) => (
    <div className="textContainer">
        <p className="title">{room}:</p>
        <p className="count">{users.length} people are online</p>
        {
        users
          ? (
              <div className="activeContainer">             
                  {users.map(({name, colorCode}) => (
                    <div key={name} className="activeItem">
                      <img src={`https://ui-avatars.com/api/?name=${name}?&length=1&rounded=true&size=20&background=${colorCode}&color=f6f6f6`} alt="avatar"/>
                      <p style= {{color: '#' + colorCode }} > {name} </p>
                    </div>
                  ))}
              </div>
          )
          : null
        }
      {/* <div className="details">
        <p>ROOMS</p>
        { <div className="list">
          {rooms.map(({room}) => (
            <div className="item">
              <p> {room} </p>
            </div>
          ))}
        </div> }
      </div> */}
      <div className="options">
        <a href="/" className="return"><BsArrowReturnLeft className="icon"/><span>back</span></a>
      </div>
    </div>
);

export default TextContainer;