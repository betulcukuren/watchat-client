import React from 'react';
import '../../../css/main.css';
import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, color }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <div className="messageBox backgroundDark" style={{
                    borderBottomRightRadius: '0px'
              }}>
            <p className="messageText colorLight">{ReactEmoji.emojify(text)}</p>
            {/* <p className="time">18:36</p> */}
          </div>
        </div>
        )
        : (
          user === 'system'
          ? (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundTransparent" style={{borderRadius: '0px'}}>             
              <p className="sentText" style={{
                  color: '#' + color,
                  fontSize:'10px'               
                }}> {user}</p>
              <p className="messageText colorDark " style={{
                  color: '#' + color,
                  fontSize:'10px'
                }}> {ReactEmoji.emojify(text)}</p>
              {/* <p className="time">18:36</p> */}

            </div>
          </div>
          ) 
          : (
            <div className="messageContainer justifyStart">
              <div className="messageBox backgroundLight" style={{
                    borderBottomLeftRadius: '0px'
              }}>           
                <p className="sentText" style={{
                    color: '#' + color
                  }}> {user}</p>
                <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                {/* <p className="time">18:36</p> */}
              </div>
            </div>
            )
          )
  );
}

export default Message;