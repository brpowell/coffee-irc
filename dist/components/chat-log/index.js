'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _message = require('../message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatLog = function (_React$Component) {
  _inherits(ChatLog, _React$Component);

  function ChatLog() {
    _classCallCheck(this, ChatLog);

    return _possibleConstructorReturn(this, (ChatLog.__proto__ || Object.getPrototypeOf(ChatLog)).apply(this, arguments));
  }

  _createClass(ChatLog, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.node.scrollTop = this.node.scrollHeight;
    }
  }, {
    key: 'renderMessages',
    value: function renderMessages() {
      var messages = this.props.messages;

      return messages.map(function (message, key) {
        var prevMessage = messages.length > 1 ? messages[key - 1] : null;
        return _react2.default.createElement(_message2.default, {
          key: message.id,
          sender: message.sender,
          message: message.message,
          timestamp: message.timestamp,
          prevMessage: prevMessage,
          type: message.type
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'chat-log', ref: function ref(node) {
            _this2.node = node;
          } },
        this.renderMessages()
      );
    }
  }]);

  return ChatLog;
}(_react2.default.Component);

exports.default = ChatLog;


ChatLog.propTypes = {
  messages: _propTypes2.default.arrayOf(_propTypes2.default.element).isRequired
};