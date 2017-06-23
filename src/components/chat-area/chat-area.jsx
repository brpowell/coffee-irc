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
        // this.addMessage = this.addMessage.bind(this);
    }

    render() {
        var activeChannelMessages;
        if(this.props.activeChannel in this.props.messages) {
            activeChannelMessages = this.props.messages[this.props.activeChannel];
        }
        else {
            activeChannelMessages = [];
        }
        var messages = activeChannelMessages.map((message, index) => {
            let prevMsg = null;
            if(activeChannelMessages.length > 1) {
                prevMsg = activeChannelMessages[index - 1];
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
                <ChatInput activeChannel={ this.props.activeChannel } addMessage={ this.props.addMessage } />
            </div>
        )
    }
}