import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Client from '../../api/client-manager';
import Modal from 'react-modal';

export default class ServerSettingsModal extends Component {
  constructor(props) {
    super(props);
    const config = props.currentServer;
    this.state = {
      name: config.name,
      address: config.address,
      nick: config.nick,
      port: config.port || 6667,
      channels: config.channels,
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    const newVal = {};
    newVal[event.target.id] = event.target.value;
    this.setState(newVal);
  }

  handleSave() {
    this.props.updateServer(this.state);
    this.props.onRequestClose();
  }

  renderField(id, label, placeholder) {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input 
          id={id}
          type="text"
          placeholder={placeholder}
          value={this.state[id]}
          onChange={this.handleInput}
        />
      </div>
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        closeTimeoutMS={200}
        contentLabel="Server Settings"
      >
        <button className="close-modal" onClick={this.props.onRequestClose}>+</button>
        <h1>Server Settings</h1>
        <form className="modal-form" onSubmit={event => event.preventDefault()}>
          {this.renderField('nick', 'Nickname', 'SassChan')}
          {this.renderField('name', 'Display Name', 'My Server')}
          {this.renderField('address', 'Server Address', 'chat.freenode.net')}
          {this.renderField('port', 'Port', '6667')}
          <button onClick={this.handleSave}>Save</button>
        </form>
      </Modal>
    );
  }
}

ServerSettingsModal.PropTypes = {
  updateServer: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  currentServer: PropTypes.string.isRequired,
};

