import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, color }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    // eslint-disable-next-line no-nested-ternary
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <div
            className="messageBox userMessage"
            style={{
              borderBottomRightRadius: '0px',
            }}
          >
            <p className="messageText">{ReactEmoji.emojify(text)}</p>
            {/* <p className="time">18:36</p> */}
          </div>
        </div>
      )
      : (
        user === 'system'
          ? (
            <div className="messageContainer justifyStart">
              <div className="messageBox systemMessage">
                <p
                  className="messageText"
                  style={{
                    color: `#${color}`,
                    fontSize: '10px',
                  }}
                >
                  {' '}
                  {ReactEmoji.emojify(text)}
                </p>
                {/* <p className="time">18:36</p> */}

              </div>
            </div>
          )
          : (
            <div className="messageContainer justifyStart">
              <div
                className="messageBox otherMessage"
                style={{
                  borderBottomLeftRadius: '0px',
                }}
              >
                <p
                  className="sentText"
                  style={{
                    color: `#${color}`,
                  }}
                >
                  {' '}
                  {user}
                </p>
                <p className="messageText">{ReactEmoji.emojify(text)}</p>
                {/* <p className="time">18:36</p> */}
              </div>
            </div>
          )
      )
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    user: PropTypes.shape({}),
    color: PropTypes.string,
  }),
  name: PropTypes.string,
};

Message.defaultProps = {
  message: {},
  name: '',
};

export default Message;
