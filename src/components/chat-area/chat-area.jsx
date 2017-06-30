import React from 'react';
import remote from 'electron';
import ChatHeader from '../chat-header/chat-header.js';
import ChatLog from '../chat-log/chat-log.js';
import ChatInput from '../chat-input/chat-input.js';
import Message from '../message/message.js';

export default class ChatArea extends React.Component {
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
                        prevMessage={ prevMsg }
                        type={ message.type } />
        });

        return(
            <div className="chat-area">
                <ChatHeader activeChannel={ this.props.activeChannel } />
                <ChatLog messages={ messages } />
                <ChatInput activeChannel={ this.props.activeChannel } addMessage={ this.props.addMessage } />
            </div>
        )
    }
}