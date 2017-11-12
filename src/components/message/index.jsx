import React from 'react';
import PropTypes from 'prop-types';
import jdenticon from 'jdenticon';
import autolinker from 'autolinker';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  render() {
    const { type, prevMessage, sender, timestamp, message } = this.props;
    let stamp = null;
    // TODO: this is just awful, render method needs to be cleaned up
    if (type === 'status' || prevMessage == null || sender !== prevMessage.sender || (sender === prevMessage.sender && type === 'message' && prevMessage.type === 'status')) {
      stamp = (<div className="message-header">
        <b>{ sender }</b>
        <span className="timestamp">{ timestamp }</span><br />
      </div>);
    }
    let avatar = null;
    if (prevMessage == null || sender !== prevMessage.sender || prevMessage.type === 'status') {
      avatar = jdenticon.toSvg(sender, 45);
    }
    const gutter = avatar ? (<div className="avatar" dangerouslySetInnerHTML={{ __html: avatar }} />) :
      (<div className="avatar">
        <span className="timestamp">{this.state.hover ? timestamp : ''}</span>
      </div>);

    return (
      <div
        className="message"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {gutter}
        <div className={`message-content ${stamp ? 'message-stamp' : ''}`}>
          { stamp }
          <span
            className={type !== 'message' ? type : ''}
            dangerouslySetInnerHTML={{ __html: autolinker.link(message, { stripPrefix: false }) }}
          />
        </div>
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
