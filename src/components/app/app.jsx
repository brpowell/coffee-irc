import React from 'react';
import SideBar from '../sidebar/sidebar.js';
import ChatArea from '../chat-area/chat-area.js';

var client = require('electron').remote.getGlobal('client');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeChannel: "", joinedChannels: [], messages: {} };
        this.enterChannel = this.enterChannel.bind(this);
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount() {
        client.addListener('message', (sender, to, message) => {
            console.log(sender + " " + to + " " + message);
            this.addMessage(sender, to, message);
        });
    }

    enterChannel(channel) {
        var joined = this.state.joinedChannels;
        if(joined.indexOf(channel) == -1) {
            client.join(channel);
            joined.push(channel);
        }
        this.setState({ activeChannel: channel, joinedChannels: joined });
    }

    addMessage(sender, to, message) {
        var messages = this.state.messages;
        var newMessage = { 
            sender: sender, 
            message: message,
            timestamp: this.getTimestamp()
        };
        if(to in messages) {
            messages[to].push(newMessage);
        }
        else {
            messages[to] = [newMessage];
        }
        this.setState({ messages: messages, newMessage: to });
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
        var channels = ['#cool', '#release', '#random'];
        return(
            <div>
                <SideBar 
                    activeChannel={ this.state.activeChannel }
                    channels={ channels }
                    joinedChannels={ this.state.joinedChannels }
                    enterChannel= { this.enterChannel }/>
                <ChatArea 
                    addMessage={ this.addMessage }
                    activeChannel={ this.state.activeChannel }
                    messages={ this.state.messages }/>
            </div>
        )
    }
}