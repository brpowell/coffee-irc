import React, { Component } from 'react';
import ServerArea from '../../components/server-area';
import ChannelList from '../../components/channel-list';

/* 
Redux plans
  - state container
  - mapStateToProps and mapDispatchToProps
*/

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <ServerArea
          onlineStatus={this.props.onlineStatus}
          handleDisconnect={this.props.handleDisconnect}
          handleConnect={this.props.handleConnect}
          showModal={this.props.showModal}
        />
        <ChannelList
          activeConversation={this.props.activeConversation}
          joinedChannels={this.props.joinedChannels}
          enterConversation={this.props.enterConversation}
          targets={this.props.targets}
          alertNew={this.props.alertNew}
        />
      </div>
    );
  }
}
