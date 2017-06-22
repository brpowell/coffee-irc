import React from 'react';
import reactDOM from 'react-dom';

export default class ChatLog extends React.Component {
    componentDidUpdate() {
        const node = reactDOM.findDOMNode(this.messagesContainer);
        node.scrollTop = node.scrollHeight;
    }

    render() {
        return(
            <div className="chat-log" ref={ (el) => { this.messagesContainer = el; } }>
                { this.props.messages }
            </div>
        )
    }
}