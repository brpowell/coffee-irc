import React from 'react';
import PropTypes from 'prop-types';
import Message from '../message';

export default class ChatLog extends React.Component {
  componentDidUpdate() {
    this.node.scrollTop = this.node.scrollHeight;
  }

  renderMessages() {
    const { messages } = this.props;
    return messages.map((message, key) => {
      const prevMessage = messages.length > 1 ? messages[key - 1] : null;
      return (
        <Message
          key={message.id}
          sender={message.sender}
          message={message.message}
          timestamp={message.timestamp}
          prevMessage={prevMessage}
          type={message.type}
        />
      );
    });
  }

  render() {
    return (
      <div className="chat-log" ref={(node) => { this.node = node; }}>
        { this.renderMessages() }
      </div>
    );
  }
}

ChatLog.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.element).isRequired,
};
