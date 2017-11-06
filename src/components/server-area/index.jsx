import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-popover';
import PopoverMenu from '../popover-menu';
import Client from '../../api/client-manager';

export default class ServerArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.toggleMenu.bind(null, false);
  }

  componentDidMount() {
    // TODO: display motd info and server stuff on connect
  }

  createMenu() {
    const menuItems = {};
    if (this.props.onlineStatus === 'online') {
      menuItems.Disconnect = this.props.handleDisconnect;
    } else if (this.props.onlineStatus === 'offline') {
      menuItems.Connect = this.props.handleConnect;
    }

    menuItems['-'] = null;
    menuItems['Set Nickname'] = null;
    menuItems['Server Settings'] = null;

    return (
      <PopoverMenu
        menuItems={menuItems}
        closeAction={this.closeMenu}
      />
    );
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    return (
      <Popover
        isOpen={this.state.menuOpen}
        place="below"
        className="server-menu"
        body={this.createMenu()}
        onOuterAction={this.closeMenu}
      >
        <div role="button" className="server-area" onClick={this.toggleMenu} tabIndex={0}>
          <div className="server-info">{ Client.current }</div>
          <div className="user-info">
            { this.props.onlineStatus === 'online' ? `@${Client.getNick()}` : this.props.onlineStatus }
            <div className={this.props.onlineStatus} />
          </div>
        </div>
      </Popover>
    );
  }
}

ServerArea.propTypes = {
  onlineStatus: PropTypes.string.isRequired,
  handleDisconnect: PropTypes.func.isRequired,
  handleConnect: PropTypes.func.isRequired,
};
