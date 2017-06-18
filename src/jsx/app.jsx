import React from 'react';
import reactDOM from 'react-dom';
const irc = require('irc');
const client = require('electron').remote.getGlobal('client');

class Message extends React.Component {
    render() {
        return(
            <div className="message"><span>{ this.props.sender }</span>: { this.props.message }</div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: "", messages: [] };
        this.handleInput = this.handleInput.bind(this);
        this.handleSendKey = this.handleSendKey.bind(this);
    }

    componentDidMount() {
       client.join('#cool');
       client.addListener('message', (sender, to, message) => {
           console.log(sender + " => " + to + ": " + message);
           this.addMessage(sender, message);
       })
    }

    addMessage(sender, message) {
        var messages = this.state.messages;
        messages.push({ sender: sender, message: message });
        this.setState({ messages: messages });
    }

    handleSendKey(event) {
        if(event.key === 'Enter') {
            client.say('#cool', this.state.input )
            this.addMessage(client.nick, this.state.input);
            this.setState({ input: "" });
        }
    }

    handleInput(event) {
        this.setState({ input: event.target.value });
    }

    render() {
        var messages = this.state.messages.map(message => {
            return <Message sender={ message.sender } message={ message.message } />
        });
        return(
            <div>
               <div className="chat-log">
                    { messages }
                </div>
                <div className="chat-input">
                    <input value={ this.state.input } onKeyPress={ this.handleSendKey } onChange={ this.handleInput }></input>
                </div> 
            </div>
        )
    }
}

reactDOM.render(<App />, document.getElementById('root'));