import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { BiFullscreen } from 'react-icons/bi';
import { FaPlay } from 'react-icons/fa';
import { ImVolumeMedium, ImVolumeMute2 } from 'react-icons/im';
import Duration from './Duration';

import './VideoPlayer.css';

const VideoPlayer = ({
  url, seeking, setSeeking, setPlayed, played,
}) => {
  const player = useRef(null);
  const [duration, setDuration] = useState(0);
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

  const changePlayed = (e) => {
    setPlayed(parseFloat(e.currentTarget.value));
    setSeeking(false);
    player.current.seekTo(parseFloat(e.currentTarget.value));
  };

  const handleProgress = (state) => {
    if (!seeking) {
      console.log(state);
      setDuration(player.current.getDuration());
      setPlayed(state.playedSeconds);
      const range = document.getElementById('range');
      setPlayed(player.current.played);
      const playedGradient = (state.playedSeconds / duration) * 100;
      console.log(`playedGradient:  ${playedGradient}`);
      const loadedGradient = (state.loadedSeconds / duration) * 100;
      range.style.background = `linear-gradient(to right,
        red 0%, red ${playedGradient}%,
        #777 ${playedGradient}%, #777 ${loadedGradient}%,
        #444 ${loadedGradient}%, #444 100%)`;
    }
  };

  return (
    <div className="playerContainer">
      <div className="playerSection">
        <ReactPlayer
          ref={player}
          id="player"
          className="player"
          url={url}
          onProgress={handleProgress}
        />
      </div>

      <div className="toolbar">
        <div className="wrap">
          <input
            id="range"
            className="range"
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={() => { setSeeking(true); }}
            onChange={changePlayed}
            onMouseUp={() => { setSeeking(false); }}
          />
        </div>
        <div className="controls">
          <button className="play control button" type="button">
            <FaPlay className="control icon" />
          </button>
          <Duration seconds={duration} className="duration" />
          <button className="volume control button" type="button">
            <ImVolumeMedium className="control icon" />
          </button>
          <button type="button" className="fullscreen control button" onClick={makeScreenfull}><BiFullscreen className="control icon" /></button>
        </div>
        <div className="layer" />
      </div>
      {/* <div className="playerSetting">
        <p>Paste your link</p>
        <input type
        ="text" onChange={setUrl} />
      </div> */}
    </div>
  );
};

export default VideoPlayer;
