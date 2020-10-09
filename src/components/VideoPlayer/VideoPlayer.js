import React from 'react';
import ReactPlayer from 'react-player';
import { AiOutlineFullscreen } from 'react-icons/ai';

import './VideoPlayer.css';

const VideoPlayer = ({
  url, setDuration, setSeeking, setPlayed,
  setPlaying, setVolume, setMuted,
  setLoaded, played, volume,
}) => {
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
      <div className="playerSection">
        <ReactPlayer
          id="player"
          className="player"
          url={url}
          config={{
            controls: true,
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
          seekTo={played}

        />
        <div className="wrap">
          <input
            className="range"
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={() => { setSeeking(true); }}
            onChange={(e) => setPlayed(parseFloat(e.currentTarget.value))}
            onMouseUp={() => { setSeeking(false); }}
          />
        </div>
      </div>
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
