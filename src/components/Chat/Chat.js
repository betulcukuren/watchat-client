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
import Menu from '../Menu';
import Typing from '../Typing';
import Toggles from '../Toggles';
import WindowFocusHandler from '../WindowFocusHandler';
import FilePreview from '../FilePreview';

import './Chat.css';

const Chat = ({ name }) => {
  const { room } = useParams();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState([]);
  const [uploadFlag, setUploadFlag] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState('light');
  const [notification, setNotification] = useState(true);

  const ENDPOINT = process.env.REACT_APP_ENDPOINT;
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
      setMessages((msgs) => [...msgs, msg]);
    });

    socket.current.on('roomData', ({ users: userList }) => {
      setUsers(userList);
    });

    socket.current.on('typingStatus', ({ users: userList }) => {
      setUsers(userList);
    });
  }, []);

  useEffect(() => {
    socket.current.emit('typing', typing);
  }, [typing, socket]);

  const sendMessage = useCallback((event) => {
    event.preventDefault();

    if (message) {
      socket.current.emit('sendMessage', message, () => setMessage(''));
      setTyping(false);
    }
  }, [setMessage, message, setTyping]);

  const onMessage = useCallback((e) => {
    const { currentTarget: { value } } = e;
    setMessage(value);
    if (value && !typing) {
      setTyping(true);
    } else if (!value && typing) {
      setTyping(false);
    }
  }, [setTyping, typing]);

  const toggleTheme = useCallback(() => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [theme, setTheme]);

  const toggleNotification = useCallback(() => {
    if (notification === true) {
      setNotification(false);
    } else {
      setNotification(true);
    }
  }, [notification, setNotification]);

  const setPreview = useCallback((e) => {
    setUploadFlag(true);
    setFile(e.target.files[0]);
  }, [setFile]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="outerContainer">
          {notification && <WindowFocusHandler setNotification={setNotification} />}
          <Toggles
            toggleTheme={toggleTheme}
            theme={theme}
            toggleNotification={toggleNotification}
            notification={notification}
          />
          <Menu />
          {
            uploadFlag
              ? (<FilePreview file={file} />)
              : (
                <div className="container">
                  <Messages messages={messages} name={name} />
                  <Typing users={users} name={name} />
                  <Input
                    message={message}
                    setMessage={onMessage}
                    sendMessage={sendMessage}
                    setPreview={setPreview}
                  />
                </div>
              )
            }
          {uploadFlag
            ? <Details users={users} room={room} file={file} />
            : <Details users={users} room={room} />}
        </div>
      </>
    </ThemeProvider>
  );
};

export default Chat;
