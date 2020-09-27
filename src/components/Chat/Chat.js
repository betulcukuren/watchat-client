import React, { useState, useEffect, useCallback, useRef } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Theme/theme';
import { GlobalStyles } from '../Theme/global';

import Details from '../Details/Details';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import Menu from '../Menu/Menu';
import Typing from '../Typing/Typing';

import './Chat.css';

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  const socket = useRef(io(ENDPOINT));

  const [theme, setTheme] = useState('light');
  // The function that toggles between themes
  const toggleTheme = useCallback(() => {
    // if the theme is not light, then set it to dark
    if (theme === 'light') {
      setTheme('dark');
    // otherwise, it should be light
    } else {
      setTheme('light');
    }
  },[theme, setTheme]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setRoom(room);
    setName(name);
    
    socket.current.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [socket, ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.current.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.current.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.current.on("typingStatus", ({users}) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    socket.current.emit('typing', typing);
  }, [typing, socket])

  const sendMessage = useCallback((event) => {
    event.preventDefault();

    if(message) {
      socket.current.emit('sendMessage', message, () => setMessage(''));
      setTyping(false);
    }
  }, [setMessage, message, setTyping]);

  const onMessage = useCallback((e) => {
    const {currentTarget: {value} } = e;
    setMessage(value);
    if(value && !typing){
      setTyping(true);
    } else if (!value && typing) {
      setTyping(false);
    }
  }, [setTyping, typing]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <>
      <GlobalStyles />
      <div className="outerContainer">
        <label className="switch" >
          <input type="checkbox" onChange={toggleTheme}/>
          <span className="slider"></span>
        </label>
        <Menu/> 
        <div className="container">
            <Messages messages={messages} name={name}/>
            <Typing users={users} name={name}/> 
            <Input
              message={message}
              setMessage={onMessage}
              setTyping={setTyping}
              sendMessage={sendMessage}
            />
        </div>
        <Details users={users} room={room}/>
      </div>
    </>
    </ThemeProvider>
  );  
}

export default Chat;