'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _chatHeader = require('../chat-header/chat-header.js');

var _chatHeader2 = _interopRequireDefault(_chatHeader);

var _chatLog = require('../chat-log/chat-log.js');

var _chatLog2 = _interopRequireDefault(_chatLog);

var _chatInput = require('../chat-input/chat-input.js');

var _chatInput2 = _interopRequireDefault(_chatInput);

var _message = require('../message/message.js');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChatArea = function ChatArea(props) {
  var activeChannelMessages = void 0;
  if (props.activeChannel in props.messages) {
    activeChannelMessages = props.messages[props.activeChannel];
  } else {
    activeChannelMessages = [];
  }
  var messages = activeChannelMessages.map(function (message, index) {
    var prevMsg = null;
    if (activeChannelMessages.length > 1) {
      prevMsg = activeChannelMessages[index - 1];
    }
    return _react2.default.createElement(_message2.default, {
      sender: message.sender,
      message: message.message,
      timestamp: message.timestamp,
      prevMessage: prevMsg,
      type: message.type
    });
  });

  return _react2.default.createElement(
    'div',
    { className: 'chat-area' },
    _react2.default.createElement(_chatHeader2.default, { activeChannel: props.activeChannel }),
    _react2.default.createElement(_chatLog2.default, { messages: messages }),
    _react2.default.createElement(_chatInput2.default, { activeChannel: props.activeChannel, addMessage: props.addMessage })
  );
};

ChatArea.propTypes = {
  activeChannel: _propTypes2.default.string.isRequired,
  addMessage: _propTypes2.default.func.isRequired,
  messages: _propTypes2.default.string.isRequired
};

exports.default = ChatArea;