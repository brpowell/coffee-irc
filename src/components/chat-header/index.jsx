import React from 'react';
import PropTypes from 'prop-types';

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
    const { users, activeConversation } = this.props;
    return (
      <div className="chat-header">
        <div className="header-block">
          <b>{ activeConversation }</b>
        </div>
        <div className="user-count">
          {users ? users.length : ''}
        </div>
      </div>
    );
  }
}

ChatHeader.propTypes = {
  activeConversation: PropTypes.string.isRequired,
  users: PropTypes.objectOf(PropTypes.string).isRequired,
};
