import React from 'react';

// var client = require('electron').remote.getGlobal('client');
import Client from '../../api/coffee-client.js';

export default class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: "" };
        this.handleInput = this.handleInput.bind(this);
        this.handleSendKey = this.handleSendKey.bind(this);
    }

    handleInput(event) {
        this.setState({ input: event.target.value });
    }

    handleSendKey(event) {
        if(event.key === 'Enter' && this.state.input.length > 0) {
            if(this.state.input.startsWith('/')) {
                Client.command(this.state.input);
            }
            else {
                Client.send(this.props.activeChannel, this.state.input);
                this.props.addMessage(Client.getNick(), this.props.activeChannel, this.state.input);
            }
            this.setState({ input: "" });
        }
    }

    render() {
        var placeholder = this.props.activeChannel ? "Send to " + this.props.activeChannel : "";
        var disabled = this.props.activeChannel ? false : true;
        return(
            <div className="chat-input">
                <input 
                    value={ this.state.input }
                    onKeyPress={ this.handleSendKey }
                    onChange={ this.handleInput }
                    placeholder={ placeholder }
                    disabled={ disabled }>
                </input>
            </div>
        )
    }
}