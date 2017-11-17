import React from 'react';
import getTimestamp from './util';
import Client from '../../api/client-manager';

import Sidebar from '../../containers/sidebar';
import ChatArea from '../../containers/chat-area';
import ServerSettingsModal from '../modals/server-settings';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeConversation: Client.getNick(),
      joinedChannels: [],
      messages: {},
      alertNew: [],
      users: {},
      targets: Client.getChannels(),
      onlineStatus: 'connecting',
      showModal: false,
      currentServer: Client.getServerConfig() };
    this.bindActions();
  }

  componentDidMount() {
    Client.on('message', (sender, to, message) => {
      this.addMessage(sender, to, message);
    });

    Client.on('selfMessage', (to, message) => {
      this.addMessage(Client.getNick(), to, message);
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
      const { args, rawCommand } = error;
      const message = `Error (${rawCommand}): ${args[2]}`;
      this.addMessage(Client.getNick(), this.state.activeConversation, message, 'error');
    });

    // triggered when user joins but doesn't part...
    Client.on('names', (channel, nicks) => {
      const users = this.state.users;
      users[channel] = nicks;
      this.setState({ users });
    });

    Client.on('motd', (motd) => {
      this.setState({ onlineStatus: 'online' });
      // this.addMessage('', '', motd);
    });

    Client.on('nick', (oldnick, newnick, channels, message) => {
      this.addMessage(newnick, this.activeConversation, message, 'status');
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
    this.handleCommand = this.handleCommand.bind(this);
    this.updateServer = this.updateServer.bind(this);
  }

  enterConversation(target, force = true) {
    const activeConversation = force ? target : this.state.activeConversation;
    if (target !== '') {
      const joined = this.state.joinedChannels;
      if (!joined.includes(target) && target.startsWith('#')) {
        joined.push(target);
      }

      const targets = this.state.targets;
      if (!targets.includes(target)) {
        targets.push(target);
      }

      const index = this.state.alertNew.indexOf(target);
      const alertNew = this.state.alertNew;
      if (index > -1) alertNew.splice(index, 1);

      this.setState({ activeConversation, joinedChannels: joined, alertNew, targets });
    } else {
      this.setState({ activeConversation });
    }
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

    const targetKey = to === Client.getNick() ? sender : to;
    if (!targets.includes(targetKey)) {
      const force = targetKey === to;
      this.enterConversation(targetKey, force);
      Client.saveTarget(targetKey); // Persist direct message user in sidebar
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

    if (!alertNew.includes(targetKey) &&
        activeConversation !== targetKey &&
        sender !== Client.getNick()) {
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

  handleCommand(input, target) {
    const stateResponse = Client.handleCommand(input, target);
    if (stateResponse) {
      this.setState(stateResponse);
    }
  }

  updateServer(config) {
    const current = this.state.currentServer;
    // TODO: this should probably be done in event handler to prevent changing if failure
    if (current.nick !== config.nick) {
      Client.changeNick(config.nick);
    }
    Client.updateServerConfig(current.name, config);
    this.setState({ currentServer: config });
  }

  render() {
    return (
      <div>
        <ServerSettingsModal
          isOpen={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
          updateServer={this.updateServer}
          currentServer={this.state.currentServer}
        />
        <Sidebar
          // Actions
          enterConversation={this.enterConversation}
          handleDisconnect={this.handleDisconnect}
          handleConnect={this.handleConnect}
          showModal={() => this.setState({ showModal: true })}
          // State
          onlineStatus={this.state.onlineStatus}
          activeConversation={this.state.activeConversation}
          joinedChannels={this.state.joinedChannels}
          targets={this.state.targets}
          alertNew={this.state.alertNew}
          currentServer={this.state.currentServer}
        />
        <ChatArea
          // Actions
          addMessage={this.addMessage}
          handleCommand={this.handleCommand}
          // State
          activeConversation={this.state.activeConversation}
          messages={this.state.messages}
          users={this.state.users[this.state.activeConversation]}
        />
      </div>
    );
  }
}
