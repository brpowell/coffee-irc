import React from 'react';
import getTimestamp from './util';
import Client from '../../api/client-manager';

import Sidebar from '../../containers/sidebar';
import ChatArea from '../../containers/chat-area';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeConversation: '',
      joinedChannels: [],
      messages: {},
      alertNew: [],
      users: {},
      targets: Client.getChannels(),
      onlineStatus: 'connecting' };
    this.bindActions();
  }

  componentDidMount() {
    Client.on('message', (sender, to, message) => {
      this.addMessage(sender, to, message);
    });

    // TODO: Don't trigger alert new on join (or leave)
    Client.on('join', (channel, nick) => {
      const message = `has joined ${channel}`;
      this.addMessage(nick, channel, message, 'status');
      if (nick === Client.getNick()) this.enterConversation(channel);
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

  bindActions() {
    this.enterConversation = this.enterConversation.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
  }

  enterConversation(target) {
    const joined = this.state.joinedChannels;
    if (!joined.includes(target)) {
      joined.push(target);
    }

    const targets = this.state.targets;
    if (!targets.includes(target)) {
      targets.push(target);
    }

    const index = this.state.alertNew.indexOf(target);
    const alertNew = this.state.alertNew;
    if (index > -1) alertNew.splice(index, 1);

    this.setState({ activeConversation: target, joinedChannels: joined, alertNew, targets });
  }

  leaveChannel(channel) {
    const joined = this.state.joinedChannels;
    const index = joined.indexOf(channel);
    let newActive = '';
    if (index !== -1) joined.splice(index, 1);
    if (this.state.joinedChannels.length > 0) {
      const newIndex = index === 0 ? this.state.joinedChannels.length - 1 : index - 1;
      newActive = this.state.joinedChannels[newIndex];
    }
    this.setState({
      targets: Client.getChannels(),
      joinedChannels: joined,
      activeConversation: newActive });
  }

  /*
   * Adds a message to the app's state. If a user is not browsing the conversation with the
   * sender, then the sender is marked as a new alert
  */
  addMessage(sender, to, message, type = 'message') {
    const { messages, alertNew, activeConversation, targets } = this.state;

    // Check if conversation with channel or direct user
    let targetKey = to;
    if (targetKey === Client.getNick()) {
      if (!targets.includes(sender)) {
        this.enterConversation(sender);
      }
      targetKey = sender;
    }

    const newMessage = {
      id: targetKey in messages ? messages[targetKey].length : 0,
      sender,
      message,
      timestamp: getTimestamp(),
      type,
    };

    if (targetKey in messages) {
      messages[targetKey].push(newMessage);
    } else {
      messages[targetKey] = [newMessage];
    }

    if (!alertNew.includes(targetKey) && activeConversation !== targetKey) {
      alertNew.push(targetKey);
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
    this.addMessage(Client.getNick(), this.state.activeConversation, 'has disconnected', 'status');
  }

  render() {
    return (
      <div>
        <Sidebar
          // Actions
          enterConversation={this.enterConversation}
          handleDisconnect={this.handleDisconnect}
          handleConnect={this.handleConnect}
          // State
          onlineStatus={this.state.onlineStatus}
          activeConversation={this.state.activeConversation}
          joinedChannels={this.state.joinedChannels}
          targets={this.state.targets}
          alertNew={this.state.alertNew}
        />
        <ChatArea
          addMessage={this.addMessage}
          activeConversation={this.state.activeConversation}
          messages={this.state.messages}
          users={this.state.users[this.state.activeConversation]}
        />
      </div>
    );
  }
}
