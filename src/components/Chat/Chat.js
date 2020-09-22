import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Details from '../Details/Details';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import Menu from '../Menu/Menu';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Theme/theme';
import { GlobalStyles } from '../Theme/global';
import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://chat-app-exercise.herokuapp.com/';

  const [theme, setTheme] = useState('light');
  // The function that toggles between themes
  const toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (theme === 'light') {
      setTheme('dark');
    // otherwise, it should be light
    } else {
      setTheme('light');
    }
  }

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);
    
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

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
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <Details users={users} room={room}/>
      </div>
    </>
    </ThemeProvider>
  );  
}

export default Chat;