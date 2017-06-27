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
        console.log(this.props.type);
        if(this.props.type === 'status' || prevMessage == null || this.props.sender !== prevMessage.sender || (this.props.sender === prevMessage.sender && this.props.type === 'message' && prevMessage.type === 'status')) {
            stamp = <span>
            <b>{ this.props.sender }</b><i className="timestamp-first">{ this.props.timestamp }</i><br/>
            </span>
            className += " message-stamp";
        }

        return(
            <div 
                className={ className }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }>

                { stamp }
                <div className={ this.props.type === 'status' ? 'status' : '' }>{ this.props.message }</div>
                { this.state.showTimestamp ? <i className="timestamp">{ this.props.timestamp }</i> : null }
            </div>
        )
    }
}