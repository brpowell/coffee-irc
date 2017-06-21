import React from 'react';
import reactDOM from 'react-dom';
const client = require('electron').remote.getGlobal('client');

class Message extends React.Component {
    render() {
        var className = "message";
        var prevMessage = this.props.prevMessage;
        var stamp;

        if(prevMessage == null || this.props.sender !== prevMessage.sender) {
            stamp = <span>
                <b>{ this.props.sender }</b><i>{ this.props.timestamp }</i><br/>
            </span>
            className += " message-stamp";
        }

        return(
            <div className={ className }>
                { stamp }
                { this.props.message }
            </div>
        )
    }
}

class ChannelList extends React.Component {
    render() {
        return(
            <div className="channel-list"></div>
        )
    }
}

class ChatInput extends React.Component {
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
            client.say('#cool', this.state.input )
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

class ChatLog extends React.Component {
    componentDidUpdate() {
        const node = reactDOM.findDOMNode(this.messagesContainer);
        node.scrollTop = node.scrollHeight;
    }

    render() {
        return(
            <div className="chat-log" ref={ (el) => { this.messagesContainer = el; } }>
                { this.props.messages }
            </div>
        )
    }
}

class ChatArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.addMessage = this.addMessage.bind(this);
    }
    
    componentDidMount() {
        client.addListener('message', (sender, to, message) => {
           this.addMessage(sender, message);
        });
    }

    addMessage(sender, message) {
        var messages = this.state.messages;
        messages.push({ 
            sender: sender, 
            message: message,
            timestamp: this.getTimestamp()
        });
        this.setState({ messages: messages });
    }

    getTimestamp() {
        var date = new Date();

        var hour = date.getHours();
        var period;
        if(hour > 11) {
            hour = hour % 12;
            period = 'PM';
        }
        else {
            hour = hour < 10 ? '0' + hour : hour;
            period = 'AM';
        }
        
        var min = date.getMinutes();
        min = min < 10 ? '0' + min : min;

        return hour + ':' + min + ' ' + period;
    }

    render() {
        var messages = this.state.messages.map((message, index) => {
            let prevMsg = null;
            if(this.state.messages.length > 1) {
                prevMsg = this.state.messages[index - 1];
            }
            return <Message 
                        key={ index }
                        sender={ message.sender }
                        message={ message.message }
                        timestamp={ message.timestamp }
                        prevMessage={ prevMsg } />
        });

        return(
            <div className="chat-area">
                <ChatLog messages={ messages } />
                <ChatInput addMessage={ this.addMessage } />
            </div>
        )
    }
}

class App extends React.Component {
    componentDidMount() {
       client.join('#cool');
    }

    render() {
        return(
            <div>
                <ChannelList />
                <ChatArea />
            </div>
        )
    }
}

reactDOM.render(<App />, document.getElementById('root'));