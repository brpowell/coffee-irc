import React from 'react';

var client = require('electron').remote.getGlobal('client');

export default class ChannelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { channels: this.props.channels };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        var channel = event.target.textContent;
        this.props.enterChannel(channel);
    }

    render() {
        var channels = this.state.channels.map((channel, index) => {
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
