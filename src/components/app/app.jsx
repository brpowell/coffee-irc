import React from 'react';
import SideBar from '../sidebar/sidebar.js';
import ChatArea from '../chat-area/chat-area.js';
import {getTimestamp} from './util';
import Client from '../../api/coffee-client.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeChannel: "",
            joinedChannels: [],
            messages: {},
            alertNew: [],
            channels: Client.getChannels() };
        this.enterChannel = this.enterChannel.bind(this);
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount() {
        Client.on('message', (sender, to, message) => {
            this.addMessage(sender, to, message);
        });

        Client.on('join', (channel, nick) => {
            if(nick === Client.getNick()) this.enterChannel(channel);
            let message = "has joined " + channel;
            this.addMessage(nick, channel, message, 'status');
        });

        Client.on('part', (channel, nick) => {
            let message = "has left " + channel;
            this.addMessage(nick, channel, message, 'status');
        })

        Client.on('error', error => {
            console.log(error);
        })
    }

    enterChannel(channel) {
        var joined = this.state.joinedChannels;
        if(joined.indexOf(channel) == -1) {
            Client.join(channel);
            joined.push(channel);
        }

        var channels = this.state.channels;
        if(channels.indexOf(channel) == -1) {
            channels.push(channel);
        }

        var index = this.state.alertNew.indexOf(channel);
        var alertNew = this.state.alertNew;
        if(index > -1) alertNew.splice(index, 1);

        this.setState({ activeChannel: channel, joinedChannels: joined, alertNew: alertNew, channels: channels });
    }

    addMessage(sender, to, message, type='message') {
        var messages = this.state.messages;
        var newMessage = { 
            sender: sender, 
            message: message,
            timestamp: getTimestamp(),
            type: type
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
        return(
            <div>
                <SideBar 
                    activeChannel={ this.state.activeChannel }
                    channels={ this.state.channels }
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