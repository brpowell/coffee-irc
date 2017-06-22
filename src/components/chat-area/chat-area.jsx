import React from 'react';
import remote from 'electron';
import ChatLog from '../chat-log/chat-log.js';
import ChatInput from '../chat-input/chat-input.js';
import Message from '../message/message.js';

var client = require('electron').remote.getGlobal('client');

export default class ChatArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.addMessage = this.addMessage.bind(this);
    }
    
    componentDidMount() {
        client.addListener('message', (sender, to, message) => {
            console.log(sender + " " + to + " " + message);
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
            hour = hour != 12 ? hour % 12 : 12;
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
                <ChatInput activeChannel={ this.props.activeChannel } addMessage={ this.addMessage } />
            </div>
        )
    }
}