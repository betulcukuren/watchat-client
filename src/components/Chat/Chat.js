import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Theme/theme';
import GlobalStyles from '../Theme/global';
import Details from '../Details';
import Messages from '../Messages';
import Input from '../Input';
import Typing from '../Typing';
import FilePreview from '../FilePreview';
import VideoPlayer from '../VideoPlayer';
import './Chat.css';

const Chat = ({ name, setName }) => {
  const { room } = useParams();

  /* General States */
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState('light');
  const [soundChoice, setSoundChoice] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [check, setCheck] = useState(false);
  const [file, setFile] = useState([]);
  const [uploadFlag, setUploadFlag] = useState(false);
  const [roomInfo, setRoomInfo] = useState({});

  /* Video Player States */
  const [url, setUrl] = useState('');
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);

  const ENDPOINT = 'http://localhost:5000/';
  const socket = useRef(io(ENDPOINT));

  useEffect(() => {
    socket.current.emit('join', { name, room }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }, [socket, ENDPOINT, name, room]);
  useEffect(() => {
    socket.current.on('message', (msg) => {
      if (msg.image) {
        const img = new Image();
        img.src = `data:image/jpg;base64,${msg.image}`;
        setMessages((msgs) => [...msgs, img]);
      } else {
        setMessages((msgs) => [...msgs, msg]);
      }
    });

    socket.current.on('roomData', ({ users: userList }) => {
      setUsers(userList);
    });

    socket.current.on('room', (currentRoom) => {
      setRoomInfo(currentRoom);
    });

    socket.current.on('users', ({ users: userList }) => {
      setUsers(userList);
    });
  }, []);

  /* Username change */
  const changeUsername = useCallback((newUsername) => {
    if (newUsername) {
      socket.current.emit('changeUsername', newUsername);
      setName(newUsername);
      setCheck(false);
    }
  }, [setName, socket]);

  /* Typing Hook */
  useEffect(() => {
    socket.current.emit('typing', typing);
  }, [typing, socket]);

  /* Typing & Send Message */
  const sendMessage = useCallback((event) => {
    event.preventDefault();

    if (message) {
      socket.current.emit('sendMessage', message, () => setMessage(''));
      setTyping(false);
    }
  }, [setMessage, message, setTyping]);

  /* Send Image Message */
  const sendImage = useCallback(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        socket.current.emit('sendMessage', base64, () => setFile([]));
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
    roomInfo.video.url = url;
    roomInfo.video.user = name;
    socket.current.emit('changeVideoUrl', roomInfo);
  }, [roomInfo, name, url]);
  const handlePlayPause = useCallback((playing) => {
    roomInfo.video.playing = playing;
    roomInfo.video.user = name;
    socket.current.emit('handlePlayPause', roomInfo, playing);
  }, [roomInfo, name]);

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
                    openMenu && (
                      <VideoPlayer
                        className="player"
                        url={roomInfo.video.url}
                        played={roomInfo.video.played}
                        playing={roomInfo.video.playing}
                        seeking={seeking}
                        setDuration={setDuration}
                        setPlayed={setPlayed}
                        handlePlayPause={handlePlayPause}
                        setSeeking={setSeeking}
                        volume={volume}
                        setVolume={setVolume}
                        muted={muted}
                        setMuted={setMuted}
                        setLoaded={setLoaded}
                        changeUrl={changeUrl}
                        onUrl={onUrl}
                        config={{ controls: true }}
                      />
                    )
                  }
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
          <Details
            users={users}
            roomName={room}
            name={name}
            changeUsername={changeUsername}
            check={check}
            setCheck={setCheck}
            toggleTheme={toggleTheme}
            theme={theme}
            toggleNotification={toggleNotification}
            soundChoice={soundChoice}
          />
        </div>
      </>
    </ThemeProvider>
  );
};

export default Chat;
