import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../css/main.css';
import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">join the room</h1>
        <div>
          <input placeholder="username" className="joinInput" type="text" maxLength="15" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="room id" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={(e) => ((!name || !room) ? e.preventDefault() : null)} to={`/chat?name=${name}&room=${room}`}>
          <button className="joinButton mt-20" type="submit">join</button>
        </Link>
      </div>
    </div>
  );
}
