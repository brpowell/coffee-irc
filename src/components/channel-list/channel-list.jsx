import React from 'react';
import PropTypes from 'prop-types';
import Client from '../../api/client-manager.js';

export default class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const channel = event.target.textContent;
    if (Client.isConnected()) {
      Client.join(channel);
    }
    if (this.props.activeChannel !== channel) this.props.enterChannel(channel);
  }

  render() {
    const channels = this.props.channels.map((channel, index) => {
      let className = '';
      if (this.props.joinedChannels.indexOf(channel) !== -1) {
        className += 'joined';
        if (channel === this.props.activeChannel) {
          className += ' active';
        }
      }

      if (this.props.alertNew.indexOf(channel) > -1) className += ' alert-new';

      return (<li
        key={index}
        className={className}
        onClick={this.handleClick}
      >{ channel }</li>);
    });
    return (
      <ul className="channel-list">
        <div className="title">CHANNELS</div>
        { channels }
      </ul>
    );
  }
}

ChannelList.propTypes = {
  activeChannel: PropTypes.string.isRequired,
  joinedChannels: PropTypes.arrayOf(PropTypes.string).isRequired,
  channels: PropTypes.arrayOf(PropTypes.string).isRequired,
  enterChannel: PropTypes.func.isRequired,
  alertNew: PropTypes.arrayOf(PropTypes.string).isRequired,
};
