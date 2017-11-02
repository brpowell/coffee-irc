import React from 'react';
import PropTypes from 'prop-types';
import ChatHeader from '../../components/chat-header';
import ChatLog from '../../components/chat-log';
import ChatInput from '../../components/chat-input';

const ChatArea = (props) => {
  const { activeChannel, messages, users, addMessage } = props;
  const channelMessages = activeChannel in messages ? messages[activeChannel] : [];

  return (
    <div className="chat-area">
      <ChatHeader activeChannel={activeChannel} users={users} />
      <ChatLog messages={channelMessages} />
      <ChatInput activeChannel={activeChannel} addMessage={addMessage} />
    </div>
  );
};

ChatArea.propTypes = {
  activeChannel: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
  messages: PropTypes.shape({
    channel: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape({
      sender: PropTypes.string,
      message: PropTypes.string,
      timestamp: PropTypes.string,
      type: PropTypes.string,
    })),
  }).isRequired,
  users: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ChatArea;
