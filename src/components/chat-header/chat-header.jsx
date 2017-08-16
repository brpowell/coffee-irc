import React from 'react';
import PropTypes from 'prop-types';

const ChatHeader = (props) => {
  let userCount;
  if (props.users) {
    userCount = (<div className="user-count">
      <img src="../dist/assets/icons/user.png" alt="" />
      <i> { Object.keys(props.users).length }</i>
    </div>);
  }
  return (
    <div className="chat-header">
      <div>
        <b>{ props.activeChannel }</b>
        {userCount}
      </div>
    </div>
  );
};

ChatHeader.propTypes = {
  activeChannel: PropTypes.string.isRequired,
};

export default ChatHeader;
