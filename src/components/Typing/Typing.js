import React from 'react';

const Typing = ({users, name}) => 
{
    return(
        <div className="typing">
            {
                users
                    .filter(user => user.typing === true && user.name !== name )
                    .map(user => (<p key={user.name}>{user.name} is typing</p>)
            )}
        </div>
    );
}

export default Typing;