import React from 'react';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.handleHover = this.handleHover.bind(this);
    }

    handleHover(event) {
    }

    render() {
        var className = "message";
        var prevMessage = this.props.prevMessage;
        var stamp;

        if(prevMessage == null || this.props.sender !== prevMessage.sender) {
            stamp = <span>
                <b>{ this.props.sender }</b><i className="timestamp-first">{ this.props.timestamp }</i><br/>
            </span>
            className += " message-stamp";
        }
        var style = { float: 'right' };
        return(
            <div className={ className } onMouseEnter={ this.handleHover }>
                { stamp }
                { this.props.message }
                <span className="timestamp">{ this.props.timestamp }</span>
            </div>
        )
    }
}