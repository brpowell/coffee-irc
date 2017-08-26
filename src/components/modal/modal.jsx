import React from 'react';
import PropTypes from 'prop-types';
import Client from '../../api/client-manager';

export default class Modal extends React.Component {
  renderServerSettings() {
    const settings = Client.getCurrentSettings();
    return (
      <div className="modal-form">
        <form>
          <div className="form-group">
            <label>Display Name</label>
            <input type="text" placeholder="e.g. Quakenet" value={Client.current} />
          </div>
          <div className="form-group">
            <label>Server Address</label>
            <input type="text" placeholder="0.0.0.0" value={settings.address} />
          </div>
          <div className="form-group">
            <label>Port</label>
            <input type="text" placeholder="Port" value={settings.options.port ? settings.options.port : 6667} />
          </div>
        </form>
      </div>
    );
  }

  // TODO: Implement channel list modal
  // renderChannelList() {
  // }

  render() {
    let modalToRender = this.renderServerSettings();
    if (this.props.renderFor === 'server') {
      modalToRender = this.renderServerSettings();
    }
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <div className="modal-header">
            <button onClick={this.props.onClose}>X</button>
          </div>
          { modalToRender }
        </div>
      </div>
    );
  }
}
