import React from 'react';
import { MdExitToApp } from 'react-icons/md';
import { HiMenuAlt4 } from 'react-icons/hi';
import './HiddenDetails.css';

const HiddenDetails = (setDetailMenuStatus) => (
  <div className="hidden detail" id="detailMenu">
    <div className="header" id="detailHeader">
      <div className="settings" id="mainSettings">
        <button type="button" onClick={() => setDetailMenuStatus(true)}>
          <HiMenuAlt4 />
        </button>
      </div>
    </div>
    <a href="/" className="return"><MdExitToApp className="icon" /></a>
  </div>
);

export default HiddenDetails;
