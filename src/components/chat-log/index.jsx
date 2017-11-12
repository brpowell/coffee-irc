import React from 'react';
import PropTypes from 'prop-types';
import Message from '../message';

// Ratio of scrollTop to scrollHeight
const SCROLL_FACTOR = 2.2951219512;

export default class ChatLog extends React.Component {
  componentWillUpdate() {
    const { scrollTop, scrollHeight } = this.node;
    this.scrolling = Math.round(scrollTop * SCROLL_FACTOR) < scrollHeight;
  }

  componentDidUpdate() {
    const { scrollTop, scrollHeight } = this.node;
    this.node.scrollTop = this.scrolling ? scrollTop : scrollHeight;
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
