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
    if (Client.isConnected() && channel.startsWith('#')) {
      Client.join(channel);
    }
    if (this.props.activeConversation !== channel) this.props.enterConversation(channel);
  }

  render() {
    // TODO: Combine channel and direct logic to avoid repetition
    const channels = this.props.targets.filter(target => target.startsWith('#')).map((channel, index) => {
      const isJoined = this.props.joinedChannels.includes(channel) ? 'joined' : '';
      const isActive = this.props.activeConversation === channel ? 'active' : '';
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

    const directTargets = this.props.targets.filter(target => !target.startsWith('#')).map((user, index) => {
      const isActive = this.props.activeConversation === user ? 'active' : '';
      const newAlert = this.props.alertNew.includes(user) ? 'alert-new' : '';
      return (
        <li
          key={index}
          className={`joined ${isActive} ${newAlert}`}
          onClick={this.handleClick}>
          { user }
        </li>
      );
    });

    return (
      <ul className="channel-list">
        <div className="title">Channels</div>
        { channels }
        <div className="title">Direct Messages</div>
        { directTargets }
      </ul>
    );
  }
}

ChannelList.propTypes = {
  activeConversation: PropTypes.string.isRequired,
  joinedChannels: PropTypes.arrayOf(PropTypes.string).isRequired,
  targets: PropTypes.arrayOf(PropTypes.string).isRequired,
  enterConversation: PropTypes.func.isRequired,
  alertNew: PropTypes.arrayOf(PropTypes.string).isRequired,
};
