import React from 'react';
import PropTypes from 'prop-types';
import ChatHeader from '../../components/chat-header';
import ChatLog from '../../components/chat-log';
import ChatInput from '../../components/chat-input';

/* 
Redux plans
  - state container
  - mapStateToProps and pass state to the chat components
*/

const ChatArea = (props) => {
  const { activeConversation, handleCommand, messages, users, addMessage } = props;
  const channelMessages = activeConversation in messages ? messages[activeConversation] : [];

  return (
    <div className="chat-area">
      <ChatHeader activeConversation={activeConversation} users={users} />
      <ChatLog messages={channelMessages} />
      <ChatInput
        activeConversation={activeConversation}
        addMessage={addMessage}
        handleCommand={handleCommand}
      />
    </div>
  );
};

ChatArea.propTypes = {
  activeConversation: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
  handleCommand: PropTypes.func.isRequired,
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
