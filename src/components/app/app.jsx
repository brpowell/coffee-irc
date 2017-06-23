import React from 'react';
import SideBar from '../sidebar/sidebar.js';
import ChatArea from '../chat-area/chat-area.js';
import {getTimestamp} from './util';

var client = require('electron').remote.getGlobal('client');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeChannel: "", joinedChannels: [], messages: {}, alertNew: [] };
        this.enterChannel = this.enterChannel.bind(this);
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount() {
        client.addListener('message', (sender, to, message) => {
            console.log(sender + " " + to + " " + message);
            this.addMessage(sender, to, message);
        });

        client.addListener('join', (channel, nick, message) => {
            console.log(nick + " has joined " + channel);
        })
    }

    enterChannel(channel) {
        var joined = this.state.joinedChannels;
        if(joined.indexOf(channel) == -1) {
            client.join(channel);
            joined.push(channel);
        }

        var index = this.state.alertNew.indexOf(channel);
        var alertNew = this.state.alertNew;
        if(index > -1) alertNew.splice(index, 1);

        this.setState({ activeChannel: channel, joinedChannels: joined, alertNew: alertNew });
    }

    addMessage(sender, to, message) {
        var messages = this.state.messages;
        var newMessage = { 
            sender: sender, 
            message: message,
            timestamp: getTimestamp()
        };

        if(to in messages)
            messages[to].push(newMessage);
        else
            messages[to] = [newMessage];
        
        var alertNew = this.state.alertNew;
        if(alertNew.indexOf(to) == -1 && this.state.activeChannel != to) {
            alertNew.push(to);
        }
        
        this.setState({ messages: messages, alertNew: alertNew });
    }

    render() {
        var channels = ['#cool', '#release', '#random'];
        return(
            <div>
                <SideBar 
                    activeChannel={ this.state.activeChannel }
                    channels={ channels }
                    joinedChannels={ this.state.joinedChannels }
                    enterChannel= { this.enterChannel }
                    alertNew={ this.state.alertNew }/>
                <ChatArea 
                    addMessage={ this.addMessage }
                    activeChannel={ this.state.activeChannel }
                    messages={ this.state.messages }/>
            </div>
        )
    }
}