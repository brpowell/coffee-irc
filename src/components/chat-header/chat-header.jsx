import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-popover';
import PopoverMenu from '../popover-menu/popover-menu.js';

export default class ChatHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersShowing: false };
    this.toggleUsers = this.toggleUsers.bind(this);
  }

  toggleUsers() {
    this.setState({ usersShowing: !this.state.usersShowing });
  }

  render() {
    let userCount;
    if (this.props.users) {
      const menu = <PopoverMenu menuItems={this.props.users} />;
      userCount = (
        <Popover
          isOpen={this.state.usersShowing}
          place="below"
          className="server-menu"
          body={menu}
          onOuterAction={this.toggleUsers.bind(null, false)}
        >
          <div className="header-block user-count" onClick={this.toggleUsers}>
            <img src="../dist/assets/icons/user.png" alt="" />
            <i> { Object.keys(this.props.users).length }</i>
          </div>
        </Popover>);
    }
    return (
      <div className="chat-header">
        <div className="header-block">
          <b>{ this.props.activeChannel }</b>
        </div>
        {userCount}
      </div>
    );
  }
}

ChatHeader.propTypes = {
  activeChannel: PropTypes.string.isRequired,
  users: PropTypes.objectOf(PropTypes.string).isRequired,
};
