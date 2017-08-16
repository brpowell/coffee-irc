import React from 'react';
import PropTypes from 'prop-types';

const ChatHeader = props => (
  <div className="chat-header">
    <div>
      <b>{ props.activeChannel }</b>
    </div>
  </div>
);

ChatHeader.propTypes = {
  activeChannel: PropTypes.string.isRequired,
};

export default ChatHeader;
