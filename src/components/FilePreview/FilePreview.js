import React from 'react';
import './FilePreview.css';
import { IoMdClose } from 'react-icons/io';

const FilePreview = ({ file }) => (
  <div className="filePreview container">
    <div className="header">
      <span>Preview</span>
      <button type="button"><IoMdClose /></button>
    </div>
    <div className="preview">
      <img src={file ? URL.createObjectURL(file) : null} alt={file ? file.name : null} />
    </div>
    <div className="footer">
      <button type="button"> Send </button>
    </div>
  </div>
);

export default FilePreview;
