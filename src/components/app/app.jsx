import React from 'react';
import SideBar from '../sidebar/sidebar.js';
import ChatArea from '../chat-area/chat-area.js';

var client = require('electron').remote.getGlobal('client');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeChannel: "", joinedChannels: [] };
        this.enterChannel = this.enterChannel.bind(this);
    }

    enterChannel(channel) {
        var joined = this.state.joinedChannels;
        if(joined.indexOf(channel) == -1) {
            client.join(channel);
            joined.push(channel);
        }
        this.setState({ activeChannel: channel, joinedChannels: joined });
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
                <ChatArea activeChannel={ this.state.activeChannel }/>
            </div>
        )
    }
}