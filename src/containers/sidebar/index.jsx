import React, { Component } from 'react';
import ServerArea from '../../components/server-area';
import ChannelList from '../../components/channel-list';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <ServerArea
          onlineStatus={this.props.onlineStatus}
          handleDisconnect={this.props.handleDisconnect}
          handleConnect={this.props.handleConnect}
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
