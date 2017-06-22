import React from 'react';
import ChannelList from '../channel-list/channel-list.js';

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="sidebar">
                <ChannelList 
                    activeChannel={ this.props.activeChannel }
                    joinedChannels={ this.props.joinedChannels }
                    enterChannel={ this.props.enterChannel }
                    channels={ this.props.channels } />
            </div>
        )
    }
}