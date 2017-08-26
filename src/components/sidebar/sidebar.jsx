import React from 'react';
import ChannelList from '../channel-list/channel-list.js';
import ServerArea from '../server-area/server-area.js';

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <ServerArea
          onlineStatus={this.props.onlineStatus}
          handleDisconnect={this.props.handleDisconnect}
          handleConnect={this.props.handleConnect}
          toggleModal={this.props.toggleModal}
        />
        <ChannelList
          activeChannel={this.props.activeChannel}
          joinedChannels={this.props.joinedChannels}
          enterChannel={this.props.enterChannel}
          channels={this.props.channels}
          alertNew={this.props.alertNew}
        />
      </div>
    );
  }
}
