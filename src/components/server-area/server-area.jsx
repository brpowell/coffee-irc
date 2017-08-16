import React from 'react';
import Client from '../../api/client-manager.js';

export default class ServerArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { connected: false };
  }

  componentDidMount() {
    // TODO: display motd info and server stuff on connect
    Client.on('motd', () => {
      this.setState({ connected: true });
    });
  }

  render() {
    const nick = Client.getNick();
    return (
      <div className="server-area">
        <div className="server-info">{ Client.current } <span>∨</span></div>
        <div className="user-info">{ nick ? `@${nick}` : 'Connecting...'}
          <div className={this.state.connected ? 'online' : 'offline'} /></div>
      </div>
    );
  }
}
