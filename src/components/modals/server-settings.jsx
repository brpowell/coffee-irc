import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Client from '../../api/client-manager';
import Modal from 'react-modal';

export default class ServerSettingsModal extends Component {
  constructor(props) {
    super(props);
    this.prevSettings = Client.getSettings(Client.current);
    this.state = {
      name: Client.current,
      address: this.prevSettings.address,
      nick: this.prevSettings.nick,
      port: this.prevSettings.port ? this.prevSettings.port : 6667,
    };
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        closeTimeoutMS={200}
        contentLabel="Server Settings"
      >
        <h1>Server Settings</h1>
        <form>
          <div className="form-group">
            <input type="text" placeholder="Display Name" value={this.state.name} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Server Address" value={this.state.address} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Port" value={this.state.port} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Nickname" value={this.state.nick} />
          </div>
          <button>Save</button>
        </form>
      </Modal>
    );
  }
}
