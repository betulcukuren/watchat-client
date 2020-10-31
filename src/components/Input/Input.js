import React, { memo } from 'react';
import './Input.css';
import {
  MdSend, MdAttachFile, MdOndemandVideo,
} from 'react-icons/md';

const Input = ({
  setMessage,
  sendMessage,
  message,
  file, setPreview,
  // setOpenMenu, openMenu,
}) => (
  <form className="form">
    <div className="icon group">
      {/* <button
        className="button"
        onClick={() => setOpenMenu(!openMenu)}
        type="button"
      >
        <MdOndemandVideo className="icon" />
      </button> */}
      <div className="file button" style={{ color: '#caccca' }}>
        <label htmlFor="fileInput" className="fileLabel">
          <MdAttachFile />
        </label>
        <input type="file" id="fileInput" value={file} onChange={setPreview} />
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

    {' '}
    <button type="button" className="send button" onClick={(e) => sendMessage(e)} style={{ color: '#caccca' }}><MdSend /></button>
  </form>
);

export default memo(Input);
