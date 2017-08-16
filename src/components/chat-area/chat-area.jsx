import React from 'react';
import PropTypes from 'prop-types';
import ChatHeader from '../chat-header/chat-header.js';
import ChatLog from '../chat-log/chat-log.js';
import ChatInput from '../chat-input/chat-input.js';
import Message from '../message/message.js';

const ChatArea = (props) => {
  let activeChannelMessages;
  if (props.activeChannel in props.messages) {
    activeChannelMessages = props.messages[props.activeChannel];
  } else {
    activeChannelMessages = [];
  }
  const messages = activeChannelMessages.map((message, index) => {
    let prevMsg = null;
    if (activeChannelMessages.length > 1) {
      prevMsg = activeChannelMessages[index - 1];
    }
    return (<Message
      key={message.id}
      sender={message.sender}
      message={message.message}
      timestamp={message.timestamp}
      prevMessage={prevMsg}
      type={message.type}
    />);
  });

  return (
    <div className="chat-area">
      <ChatHeader activeChannel={props.activeChannel} />
      <ChatLog messages={messages} />
      <ChatInput activeChannel={props.activeChannel} addMessage={props.addMessage} />
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
};

export default ChatArea;
