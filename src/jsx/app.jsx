import React from 'react';
import reactDOM from 'react-dom';
const client = require('electron').remote.getGlobal('client');

class ChannelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { channels: this.props.channels, active: this.props.channels[0] };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        var channel = event.target.textContent;
        // client.join(channel);
        this.setState({ active: event.target.textContent })
    }

    render() {
        var channels = this.state.channels.map((channel, index) => {
            return(<li 
                    className={ channel === this.state.active ? "active" : "" }
                    onClick={ this.handleClick }>{ channel }</li>)
        })
        return(
            <ul className="channel-list">
                { channels }
            </ul>
        )
    }
}

class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="sidebar">
                <ChannelList channels={ this.props.channels } />
            </div>
        )
    }
}

class Message extends React.Component {
    render() {
        var className = "message";
        var prevMessage = this.props.prevMessage;
        var stamp;

        if(prevMessage == null || this.props.sender !== prevMessage.sender) {
            stamp = <span>
                <b>{ this.props.sender }</b><i className="timestamp-first">{ this.props.timestamp }</i><br/>
            </span>
            className += " message-stamp";
        }
        var style = { float: 'right' };
        return(
            <div className={ className }>
                { stamp }
                { this.props.message }
                <span className="timestamp">{ this.props.timestamp }</span>
            </div>
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
        var channels = ['#cool', '#release', '#random'];
        return(
            <div>
                <SideBar channels={ channels }/>
                <ChatArea />
            </div>
        )
    }
}

reactDOM.render(<App />, document.getElementById('root'));