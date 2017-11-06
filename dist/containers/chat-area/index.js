'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _chatHeader = require('../../components/chat-header');

var _chatHeader2 = _interopRequireDefault(_chatHeader);

var _chatLog = require('../../components/chat-log');

var _chatLog2 = _interopRequireDefault(_chatLog);

var _chatInput = require('../../components/chat-input');

var _chatInput2 = _interopRequireDefault(_chatInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
Redux plans
  - state container
  - mapStateToProps and pass state to the chat components
*/

var ChatArea = function ChatArea(props) {
  var activeConversation = props.activeConversation,
      messages = props.messages,
      users = props.users,
      addMessage = props.addMessage;

  var channelMessages = activeConversation in messages ? messages[activeConversation] : [];

  return _react2.default.createElement(
    'div',
    { className: 'chat-area' },
    _react2.default.createElement(_chatHeader2.default, { activeConversation: activeConversation, users: users }),
    _react2.default.createElement(_chatLog2.default, { messages: channelMessages }),
    _react2.default.createElement(_chatInput2.default, { activeConversation: activeConversation, addMessage: addMessage })
  );
};

ChatArea.propTypes = {
  activeConversation: _propTypes2.default.string.isRequired,
  addMessage: _propTypes2.default.func.isRequired,
  messages: _propTypes2.default.shape({
    channel: _propTypes2.default.string,
    messages: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      sender: _propTypes2.default.string,
      message: _propTypes2.default.string,
      timestamp: _propTypes2.default.string,
      type: _propTypes2.default.string
    }))
  }).isRequired,
  users: _propTypes2.default.objectOf(_propTypes2.default.string).isRequired
};

exports.default = ChatArea;