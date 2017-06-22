import React from 'react';

var client = require('electron').remote.getGlobal('client');

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
            client.say(this.props.activeChannel, this.state.input);
            this.props.addMessage(client.nick, this.state.input);
            this.setState({ input: "" });
        }
    }

    render() {
        return(
            <div className="chat-input">
                <input 
                    value={ this.state.input }
                    onKeyPress={ this.handleSendKey }
                    onChange={ this.handleInput }>
                </input>
            </div>
        )
    }
}