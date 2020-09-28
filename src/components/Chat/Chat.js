import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Theme/theme';
import GlobalStyles from '../Theme/global';

import { Details } from '../Details';
import Messages from '../Messages';
import Input from '../Input';
import { Menu } from '../Menu';
import { Typing } from '../Typing';
import { Toggles } from '../Toggles';
import { WindowFocusHandler } from '../WindowFocusHandler';

import './Chat.css';

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState('light');
  const [notification, setNotification] = useState(true);

  const ENDPOINT = process.env.REACT_APP_ENDPOINT;
  const socket = useRef(io(ENDPOINT));

  useEffect(() => {
    const { name: username, room: userRoom } = queryString.parse(location.search);

    setRoom(userRoom);
    setName(username);

    socket.current.emit('join', { name: username, room: userRoom }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }, [socket, ENDPOINT, location.search]);

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
          <div className="container">
            <Messages messages={messages} name={name} />
            <Typing users={users} name={name} />
            <Input
              message={message}
              setMessage={onMessage}
              sendMessage={sendMessage}
            />
          </div>
          <Details users={users} room={room} />
        </div>
      </>
    </ThemeProvider>
  );
};

export default Chat;
