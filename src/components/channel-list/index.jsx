import React from 'react';
import PropTypes from 'prop-types';
import Client from '../../api/client-manager';

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
      const isJoined = this.props.joinedChannels.includes(channel) ? 'joined' : '';
      const isActive = this.props.activeChannel === channel ? 'active' : '';
      const newAlert = this.props.alertNew.includes(channel) ? 'alert-new' : '';
      return (
        <li
          key={index}
          className={`${isJoined} ${isActive} ${newAlert}`}
          onClick={this.handleClick}>
          { channel }
        </li>
      );
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
