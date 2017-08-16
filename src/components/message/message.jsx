import React from 'react';
import PropTypes from 'prop-types';
import Client from '../../api/client-manager';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showTimestamp: false };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ showTimestamp: true });
  }

  handleMouseLeave() {
    this.setState({ showTimestamp: false });
  }

  render() {
    let className = 'message';
    const prevMessage = this.props.prevMessage;
    let stamp = null;
    if (this.props.type === 'status' || prevMessage == null || this.props.sender !== prevMessage.sender || (this.props.sender === prevMessage.sender && this.props.type === 'message' && prevMessage.type === 'status')) {
      stamp = (<span>
        <b className={this.props.sender === Client.getNick() ? 'sender-name' : ''}>{ this.props.sender }</b>
        <i className="timestamp-first">{ this.props.timestamp }</i><br />
      </span>);
      className += ' message-stamp';
    }

    return (
      <div
        className={className}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >

        { stamp }
        <div className={this.props.type === 'status' ? 'status' : ''}>{ this.props.message }</div>
        { this.state.showTimestamp ? <i className="timestamp">{ this.props.timestamp }</i> : null }
      </div>
    );
  }
}

Message.defaultProps = {
  prevMessage: null,
};

Message.propTypes = {
  prevMessage: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  sender: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
