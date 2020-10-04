import React from 'react';
import ReactPlayer from 'react-player';
import { AiOutlineFullscreen } from 'react-icons/ai';

import './VideoPlayer.css';

const VideoPlayer = ({ url }) => {
  const makeScreenfull = () => {
    const elem = document.getElementById('player');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  return (
    <div className="playerContainer">
      <ReactPlayer id="player" className="player" url={url} config={{ controls: true }} />
      {/* <div className="playerSetting">
        <p>Paste your link</p>
        <input type
        ="text" onChange={setUrl} />
      </div> */}
      <button type="button" className="fullscreen button" onClick={makeScreenfull}><AiOutlineFullscreen className="fullscreen icon" /></button>
    </div>
  );
};

export default VideoPlayer;
