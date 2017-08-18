import React from 'react';
import SideBar from '../sidebar/sidebar.js';
import ChatArea from '../chat-area/chat-area.js';
import { getTimestamp } from './util';
import Client from '../../api/client-manager.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChannel: '',
      joinedChannels: [],
      messages: {},
      alertNew: [],
      users: {},
      channels: Client.getChannels(),
      onlineStatus: 'connecting' };
    this.enterChannel = this.enterChannel.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
  }

  componentDidMount() {
    Client.on('message', (sender, to, message) => {
      this.addMessage(sender, to, message);
    });

    // TODO: Don't trigger alert new on join (or leave)
    Client.on('join', (channel, nick) => {
      const message = `has joined ${channel}`;
      this.addMessage(nick, channel, message, 'status');
      if (nick === Client.getNick()) this.enterChannel(channel);
    });

    Client.on('part', (channel, nick) => {
      const message = `has left ${channel}`;
      this.addMessage(nick, channel, message, 'status');
      const users = this.state.users;
      delete users[channel][nick];
      this.setState({ users });
      if (nick === Client.getNick()) this.leaveChannel(channel);
    });

    Client.on('error', (error) => {
      console.log(error);
    });

    // triggered when user joins but doesn't part...
    Client.on('names', (channel, nicks) => {
      const users = this.state.users;
      users[channel] = nicks;
      this.setState({ users });
    });

    Client.on('motd', (motd) => {
      this.setState({ onlineStatus: 'online' });
    });

    // Only for other users, can't handle self
    // Client.on('quit', (nick, reason, channels, message) => {
    // });
  }

  enterChannel(channel) {
    const joined = this.state.joinedChannels;
    if (joined.indexOf(channel) === -1) {
      joined.push(channel);
    }

    const channels = this.state.channels;
    if (channels.indexOf(channel) === -1) {
      channels.push(channel);
    }

    const index = this.state.alertNew.indexOf(channel);
    const alertNew = this.state.alertNew;
    if (index > -1) alertNew.splice(index, 1);

    this.setState({ activeChannel: channel, joinedChannels: joined, alertNew, channels });
  }

  leaveChannel(channel) {
    const joined = this.state.joinedChannels;
    const i = joined.indexOf(channel);
    let newActive = '';
    if (i !== -1) joined.splice(i, 1);
    if (this.state.joinedChannels.length > 0) {
      const newIndex = i == 0 ? this.state.joinedChannels.length - 1 : i - 1;
      newActive = this.state.joinedChannels[newIndex];
    }
    this.setState({
      channels: Client.getChannels(),
      joinedChannels: joined,
      activeChannel: newActive });
  }

  addMessage(sender, to, message, type = 'message') {
    const messages = this.state.messages;
    const newMessage = {
      id: to in messages ? messages[to].length : 0,
      sender,
      message,
      timestamp: getTimestamp(),
      type,
    };

    if (to in messages) {
      messages[to].push(newMessage);
    } else {
      messages[to] = [newMessage];
    }

    const alertNew = this.state.alertNew;
    if (alertNew.indexOf(to) === -1 && this.state.activeChannel !== to) {
      alertNew.push(to);
    }

    this.setState({ messages, alertNew });
  }

  handleConnect() {
    Client.connect();
    this.setState({ onlineStatus: 'online' });
  }

  handleDisconnect() {
    Client.disconnect();
    this.setState({ onlineStatus: 'offline' });
    this.addMessage(Client.getNick(), this.state.activeChannel, 'has disconnected', 'status');
  }

  render() {
    return (
      <div>
        <SideBar
          activeChannel={this.state.activeChannel}
          channels={this.state.channels}
          joinedChannels={this.state.joinedChannels}
          enterChannel={this.enterChannel}
          alertNew={this.state.alertNew}
          onlineStatus={this.state.onlineStatus}
          handleDisconnect={this.handleDisconnect}
          handleConnect={this.handleConnect}
        />
        <ChatArea
          addMessage={this.addMessage}
          activeChannel={this.state.activeChannel}
          messages={this.state.messages}
          users={this.state.users[this.state.activeChannel]}
        />
      </div>
    );
  }
}
