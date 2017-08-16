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
    if (event.key === 'Enter' && this.state.input.length > 0) {
      if (Client.send(this.state.input, this.props.activeChannel)) {
        this.props.addMessage(Client.getNick(), this.props.activeChannel, this.state.input);
      }
      this.setState({ input: '' });
    }
  }

  render() {
    const placeholder = this.props.activeChannel ? `Send to ${this.props.activeChannel}` : 'join a channel or enter a command';
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
  activeChannel: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
};
