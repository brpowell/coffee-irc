import React from 'react';
import PropTypes from 'prop-types';

export default class ChatLog extends React.Component {
  componentDidUpdate() {
    this.node.scrollTop = this.node.scrollHeight;
  }

  render() {
    return (
      <div className="chat-log" ref={(node) => { this.node = node; }}>
        { this.props.messages }
      </div>
    );
  }
}

ChatLog.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.element).isRequired,
};
