import React from 'react';
import ReactPlayer from 'react-player';

import './VideoPlayer.css';

const VideoPlayer = ({ url, setUrl }) => (
  <div className="playerContainer">
    <ReactPlayer className="player" url={url} setUrl={setUrl} config={{ controls: true }} />
    {/* <div className="playerSetting">
      <p>Paste your link</p>
      <input type="text" onChange={setUrl} />
    </div> */}
  </div>
);

export default VideoPlayer;
