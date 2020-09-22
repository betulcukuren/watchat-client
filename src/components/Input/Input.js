import React from 'react';
import '../../css/main.css';
import './Input.css';
import {RiSendPlane2Fill} from 'react-icons/ri';
import {GrEmoji} from 'react-icons/gr';
import {MdAttachFile, MdKeyboardVoice} from 'react-icons/md';


const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <div className="icon group">
      <button className="emoji button" style={{color: '#caccca'}}><GrEmoji/></button>
      <button className="file button" style={{color: '#caccca'}}><MdAttachFile/></button>
    </div>
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="voice button" style={{color: '#caccca'}}><MdKeyboardVoice/></button>
    <button className="send button" onClick={e => sendMessage(e)}  style={{color: '#caccca'}}><RiSendPlane2Fill/></button>
  </form>
)

export default Input;