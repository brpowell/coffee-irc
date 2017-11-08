import React from 'react';
import PropTypes from 'prop-types';
import Client from '../../api/client-manager';

export default class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.handleInput = this.handleInput.bind(this);
    this.handleSendKey = this.handleSendKey.bind(this);
  }

  handleInput(event) {
    this.setState({ input: event.target.value });
  }

  handleSendKey(event) {
    const input = this.state.input;
    const activeConversation = this.props.activeConversation;
    if (event.key === 'Enter' && input.length > 0) {
      if (input.startsWith('/')) {
        this.props.handleCommand(input, activeConversation);
      } else {
        Client.send(input, activeConversation);
      }
      this.setState({ input: '' });
    }
  }

  render() {
    const { activeConversation } = this.props;
    const placeholder = activeConversation ? `Send to ${activeConversation}` : 'join a channel or enter a command';
    return (
      <div className="chat-input">
        <input
          value={this.state.input}
          onKeyPress={this.handleSendKey}
          onChange={this.handleInput}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

ChatInput.propTypes = {
  activeConversation: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
};
