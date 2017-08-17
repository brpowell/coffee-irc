import React from 'react';
import Popover from 'react-popover';
import PopoverMenu from '../popover-menu/popover-menu.js';
import Client from '../../api/client-manager';

const menuItems = {
  Disconnect: Client.disconnect,
  'Set Nickname': null,
  'Server Settings': null,
};

export default class ServerArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { connected: false, menuOpen: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    // TODO: display motd info and server stuff on connect
    Client.on('motd', () => {
      this.setState({ connected: true });
    });
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const nick = Client.getNick();
    const menu = <PopoverMenu menuItems={menuItems} closeAction={this.toggleMenu.bind(null, false)} />;
    return (
      <Popover
        isOpen={this.state.menuOpen}
        place="below"
        className="server-menu"
        body={menu}
        onOuterAction={this.toggleMenu.bind(null, false)}
      >
        <div role="button" className="server-area" onClick={this.toggleMenu} tabIndex={0}>
          <div className="server-info">{ Client.current }</div>
          <div className="user-info">{ nick ? `@${nick}` : 'Connecting...'}
            <div className={this.state.connected ? 'online' : 'offline'} /></div></div>
      </Popover>
    );
  }
}
