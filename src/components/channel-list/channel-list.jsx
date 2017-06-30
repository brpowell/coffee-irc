import React from 'react';
import Client from '../../api/coffee-client.js';

export default class ChannelList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        if(Client.isConnected()) {
            var channel = event.target.textContent;
            Client.join(channel);
            if(this.props.activeChannel !== channel) this.props.enterChannel(channel);
        }
    }

    render() {
        var channels = this.props.channels.map((channel, index) => {
            var className = "";
            if(this.props.joinedChannels.indexOf(channel) != -1) {
                className += "joined";
                if(channel === this.props.activeChannel) {
                    className += " active";
                }
            }

            if(this.props.alertNew.indexOf(channel) > -1) className += " alert-new"

            return(<li 
                    key={ index }
                    className={ className }
                    onClick={ this.handleClick }>{ channel }</li>)
        })
        return(
            <ul className="channel-list">
                <div className="title">CHANNELS</div>
                { channels }
            </ul>
        )
    }
}
