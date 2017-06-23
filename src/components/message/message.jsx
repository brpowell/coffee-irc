import React from 'react';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showTimestamp: false };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter(event) {
        this.setState({ showTimestamp: true });
    }

    handleMouseLeave(event) {
        this.setState({ showTimestamp: false });
    }

    render() {
        var className = "message";
        var prevMessage = this.props.prevMessage;
        var stamp = null;

        if(prevMessage == null || this.props.sender !== prevMessage.sender) {
            stamp = <span>
                <b>{ this.props.sender }</b><i className="timestamp-first">{ this.props.timestamp }</i><br/>
            </span>
            className += " message-stamp";
        }
        var style = { float: 'right' };
        return(
            <div 
                className={ className }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }>

                { stamp }
                { this.props.message }
                { this.state.showTimestamp ? <i className="timestamp">{ this.props.timestamp }</i> : null }
            </div>
        )
    }
}