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
    const { type, prevMessage, sender, timestamp, message } = this.props;
    let stamp = null;
    // TODO: this is just awful
    if (type === 'status' || prevMessage == null || sender !== prevMessage.sender || (sender === prevMessage.sender && type === 'message' && prevMessage.type === 'status')) {
      stamp = (<span>
        <b className={sender === Client.getNick() ? 'sender-name' : ''}>{ sender }</b>
        <i className="timestamp-first">{ timestamp }</i><br />
      </span>);
    }

    return (
      <div
        className={`message ${stamp ? 'message-stamp' : ''}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        { stamp }
        <div className={type !== 'message' ? type : ''}>{ message }</div>
        { this.state.showTimestamp ? <i className="timestamp">{ timestamp }</i> : null }
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
  type: PropTypes.string.isRequired,
};
