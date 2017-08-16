import React from 'react';
import SideBar from '../sidebar/sidebar.js';
import ChatArea from '../chat-area/chat-area.js';
import { getTimestamp } from './util';
import Client from '../../api/coffee-client.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChannel: '',
      joinedChannels: [],
      messages: {},
      alertNew: [],
      channels: Client.getChannels() };
    this.enterChannel = this.enterChannel.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    Client.on('message', (sender, to, message) => {
      this.addMessage(sender, to, message);
    });

    Client.on('join', (channel, nick) => {
      const message = `has joined ${channel}`;
      this.addMessage(nick, channel, message, 'status');
      if (nick === Client.getNick()) this.enterChannel(channel);
    });

    Client.on('part', (channel, nick) => {
      const message = `has left ${channel}`;
      this.addMessage(nick, channel, message, 'status');
      if (nick === Client.getNick()) this.leaveChannel(channel);
    });

    Client.on('error', (error) => {
      console.log(error);
    });
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

  render() {
    return (
      <div>
        <SideBar
          activeChannel={this.state.activeChannel}
          channels={this.state.channels}
          joinedChannels={this.state.joinedChannels}
          enterChannel={this.enterChannel}
          alertNew={this.state.alertNew}
        />
        <ChatArea
          addMessage={this.addMessage}
          activeChannel={this.state.activeChannel}
          messages={this.state.messages}
        />
      </div>
    );
  }
}
