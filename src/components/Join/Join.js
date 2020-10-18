import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import '../../css/main.css';
import './Join.css';

const SignIn = ({ history, setName }) => {
  const room = `_${Math.random().toString(36).substr(2, 9)}`;

  const join = useCallback(() => {
    if (room) {
      history.push(`/${room}`);
    }
  }, [history, room]);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">watchat</h1>
        <div>
          <input
            placeholder="username"
            className="joinInput"
            type="text"
            maxLength="15"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <button type="button" className="joinButton mt-20" onClick={join}>create room</button>
      </div>
    </div>
  );
};

export default withRouter(SignIn);
