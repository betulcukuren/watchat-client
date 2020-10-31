import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { FaUserAlt } from 'react-icons/fa';
import { BiLink } from 'react-icons/bi';
import { lightTheme, darkTheme } from '../Theme/theme';
import GlobalStyles from '../Theme/global';
// import Details from '../Details';
import Messages from '../Messages';
import Input from '../Input';
import Typing from '../Typing';
import FilePreview from '../FilePreview';
import VideoPlayer from '../VideoPlayer';
import Toggles from '../Toggles';
import './Chat.css';

const ENDPOINT = 'https://chat-app-exercise.herokuapp.com/';
const socket = io(ENDPOINT);

const Chat = ({ name }) => {
  const { room } = useParams();
  const player = useRef(null);

  /* General States */
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState('light');
  const [soundChoice, setSoundChoice] = useState(true);
  const [openMenu, setOpenMenu] = useState(true);
  // const [check, setCheck] = useState(false);
  const [file, setFile] = useState([]);
  const [uploadFlag, setUploadFlag] = useState(false);
  const [roomInfo, setRoomInfo] = useState({});

  /* Video Player States */
  const [url, setUrl] = useState('');
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }, [name, room]);
  useEffect(() => {
    socket.on('message', (msg) => {
      if (msg.image) {
        const img = new Image();
        img.src = `data:image/jpg;base64,${msg.image}`;
        setMessages((msgs) => [...msgs, img]);
      } else {
        setMessages((msgs) => [...msgs, msg]);
      }
    });

    socket.on('roomData', ({ users: userList }) => {
      setUsers(userList);
    });

    socket.on('room', (currentRoom) => {
      setRoomInfo(currentRoom);
    });

    socket.on('seconds', (sec) => {
      player.current.seekTo(parseFloat(sec));
    });

    socket.on('users', ({ users: userList }) => {
      setUsers(userList);
    });
  }, []);

  /* Username change
  const changeUsername = useCallback((newUsername) => {
    if (newUsername) {
      socket.emit('changeUsername', newUsername);
      setName(newUsername);
      setCheck(false);
    }
  }, [setName]);
  */

  /* Typing Hook */
  useEffect(() => {
    socket.emit('typing', typing);
  }, [typing]);

  /* Typing & Send Message */
  const sendMessage = useCallback((event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
      setTyping(false);
    }
  }, [setMessage, message, setTyping]);

  /* Send Image Message */
  const sendImage = useCallback(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        socket.emit('sendMessage', base64, () => setFile([]));
      };
      setUploadFlag(false);
      reader.readAsDataURL(file);
    }
  }, [file, setUploadFlag]);
  const onMessage = useCallback((e) => {
    const { currentTarget: { value } } = e;
    setMessage(value);
    if (value && !typing) {
      setTyping(true);
    } else if (!value && typing) {
      setTyping(false);
    }
  }, [setTyping, typing]);

  /* Theme Settings */
  const toggleTheme = useCallback(() => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [theme, setTheme]);

  /* Notification */
  const toggleNotification = useCallback(() => {
    if (soundChoice === true) {
      setSoundChoice(false);
    } else {
      setSoundChoice(true);
    }
  }, [soundChoice, setSoundChoice]);
  useEffect(() => {
    if (document.visibilityState !== 'visible' && soundChoice) {
      document.querySelector('audio').play();
    }
  }, [messages, soundChoice]);

  /* File Preview */
  const setPreview = useCallback((e) => {
    setUploadFlag(!uploadFlag);
    setFile(e.target.files[0]);
  }, [setFile, setUploadFlag, uploadFlag]);

  /* Video Player */
  const onUrl = useCallback((e) => {
    const { currentTarget: { value } } = e;
    setUrl(value);
  }, [setUrl]);
  const changeUrl = useCallback((e) => {
    e.currentTarget.value = '';
    setRoomInfo({ video: { ...roomInfo.video, url, user: name } });
    socket.emit('changeVideoUrl', { video: { ...roomInfo.video, url, user: name } });
  }, [roomInfo, name, url]);
  const handlePlayPause = useCallback((playing) => {
    setRoomInfo({ video: { ...roomInfo.video, user: name, playing } });
    socket.emit('handlePlayPause', { video: { ...roomInfo.video, user: name, playing } }, playing);
  }, [roomInfo, name]);
  const setPlayed = useCallback((played) => {
    setRoomInfo({ video: { ...roomInfo.video, playedSeconds: played } });
    socket.emit('updateVideo', { video: { ...roomInfo.video, playedSeconds: played } });
  }, [roomInfo]);
  const seekToVideo = useCallback((e) => {
    setSeeking(false);
    const played = parseFloat(e.currentTarget.value);
    setRoomInfo({ video: { ...roomInfo.video, playedSeconds: played } });
    socket.emit('seekToVideo', { video: { ...roomInfo.video, playedSeconds: played } });
  }, [setRoomInfo, roomInfo, setSeeking]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <audio controls track="/audio/light.mp3" caption="audio">
          <source src="/audio/light.mp3" type="audio/mpeg" />
        </audio>
        <GlobalStyles />
        <div className="outerContainer">
          {
                    uploadFlag && (
                    <FilePreview
                      file={file}
                      sendImage={sendImage}
                      uploadFlag={uploadFlag}
                      setUploadFlag={setUploadFlag}
                    />
                    )
          }
          <div className="container">
            {
                    Object.keys(roomInfo).length > 0 && openMenu && (
                      <VideoPlayer
                        ref={player}
                        className="player"
                        url={roomInfo.video.url}
                        played={roomInfo.video.playedSeconds}
                        playing={roomInfo.video.playing}
                        seeking={seeking}
                        setPlayed={setPlayed}
                        handlePlayPause={handlePlayPause}
                        setSeeking={setSeeking}
                        volume={volume}
                        setVolume={setVolume}
                        muted={muted}
                        setMuted={setMuted}
                        changeUrl={changeUrl}
                        onUrl={onUrl}
                        seekToVideo={seekToVideo}
                      />
                    )
                  }
          </div>
          <div className="detail">
            <div className="header">
              <div className="info">
                <p id="title">
                  {room}
                  {' '}
                  <button type="button" className="button"><BiLink /></button>
                </p>
                <p className="count" id="userCount">
                  <FaUserAlt />
                  {users.length}
                  {' '}
                </p>
              </div>

              <Toggles
                toggleTheme={toggleTheme}
                theme={theme}
                toggleNotification={toggleNotification}
                soundChoice={soundChoice}
              />
              <button type="button" className="profile settings"><img className="profile photo" src="pp.png" alt="profil" /></button>
            </div>
            <Messages messages={messages} name={name} />
            <Typing users={users} name={name} />
            <Input
              message={message}
              setMessage={onMessage}
              sendMessage={sendMessage}
              setPreview={setPreview}
              setOpenMenu={setOpenMenu}
              openMenu={openMenu}
            />
          </div>
        </div>
      </>
    </ThemeProvider>
  );
};

export default Chat;
