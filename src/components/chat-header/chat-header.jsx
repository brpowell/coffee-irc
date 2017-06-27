import React from 'react';

export default class ChatHeader extends React.Component {
    render() {
        return(
            <div className="chat-header">
                <div>
                    <b>{ this.props.activeChannel }</b>
                </div>
            </div>
        );
    }
}