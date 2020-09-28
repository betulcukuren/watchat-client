import React, { memo } from 'react';
import './Input.css';
import { RiSendPlane2Fill } from 'react-icons/ri';
// import {GrEmoji} from 'react-icons/gr';
import { MdAttachFile, MdKeyboardVoice } from 'react-icons/md';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <div className="icon group">
      {/* <button className="emoji button" style={{color: '#caccca'}}><GrEmoji/></button> */}
      <div className="file button" style={{ color: '#caccca' }}>
        <label htmlFor="fileInput" className="fileLabel">
          <MdAttachFile />
        </label>
        <input type="file" id="fileInput" />
      </div>
    </div>
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={setMessage}
      onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : '')}
    />
    <button type="button" className="voice button" style={{ color: '#caccca' }}><MdKeyboardVoice /></button>
    <button type="button" className="send button" onClick={(e) => sendMessage(e)} style={{ color: '#caccca' }}><RiSendPlane2Fill /></button>
  </form>
);

export default memo(Input);
