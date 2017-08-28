import React from 'react';
import PropTypes from 'prop-types';
import Client from '../../api/client-manager';

export default class Modal extends React.Component {
  handleSave() {
    Client.writeSettings();
  }

  renderServerSettings() {
    console.log(this.props);
    const settings = Client.getCurrentSettings();
    const formElements = {
      name: { label: 'Display Name', placeholder: 'ExampleNET', defaultValue: Client.current },
      address: { label: 'Server Address', placeholder: 'irc.example.net', defaultValue: settings.address },
      port: { label: 'Port', placeholder: '6667', defaultValue: settings.options.port ? settings.options.port : 6667 },
    };
    const nodes = Object.entries(formElements).map(([key, group]) => (
      <div key={key} className="form-group">
        <label>{group.label}</label>
        <input type="text" placeholder={group.placeholder} defaultValue={group.defaultValue} />
      </div>
    ));
    return (
      <div className="modal-form">
        <form>
          {nodes}
          <div role="button">Save</div>
        </form>
        <form>
          {nodes}
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
