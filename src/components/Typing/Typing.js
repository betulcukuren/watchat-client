import React from 'react';
import './Typing.css';

const Typing = ({ users, name }) => {
  const typingUsers = users.filter((user) => user.typing === true && user.name !== name);
  const count = typingUsers.length;
  let typingUserNameStr = '';
  for (let i = 0; i < count; i += 1) {
    if (i === count - 1) {
      typingUserNameStr += typingUsers[i].name;
    } else {
      typingUserNameStr = `${typingUserNameStr + typingUsers[i].name}, `;
    }
  }

  return (
    <div className="typing">
      {
                // eslint-disable-next-line no-nested-ternary
                count >= 5
                  ? (
                    <span key="usersTyping">
                      {' '}
                      {count}
                      {' '}
                      people are typing..
                    </span>
                  )
                  : (
                    // eslint-disable-next-line no-nested-ternary
                    count === 1
                      ? (
                        <span key={typingUserNameStr}>
                          {' '}
                          {typingUserNameStr}
                          {' '}
                          is typing..
                          {' '}
                        </span>
                      )
                      : (
                        count !== 0
                          ? (
                            <span key={typingUserNameStr}>
                              {' '}
                              {typingUserNameStr}
                              {' '}
                              are typing..
                              {' '}
                            </span>
                          )
                          : ('')
                      )
                  )
            }
    </div>
  );
};

export default Typing;

/*
                users
                    .filter(user => user.typing === true && user.name !== name )
                    .map(user => (<p key={user.name}>{user.name} is typing</p>)
*/
