'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

var _chatLog = require('../chat-log/chat-log.js');

var _chatLog2 = _interopRequireDefault(_chatLog);

var _chatInput = require('../chat-input/chat-input.js');

var _chatInput2 = _interopRequireDefault(_chatInput);

var _message = require('../message/message.js');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var client = require('electron').remote.getGlobal('client');

var ChatArea = function (_React$Component) {
    _inherits(ChatArea, _React$Component);

    function ChatArea(props) {
        _classCallCheck(this, ChatArea);

        var _this = _possibleConstructorReturn(this, (ChatArea.__proto__ || Object.getPrototypeOf(ChatArea)).call(this, props));

        _this.state = { messages: [] };
        _this.addMessage = _this.addMessage.bind(_this);
        return _this;
    }

    _createClass(ChatArea, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            client.addListener('message', function (sender, to, message) {
                console.log(sender + " " + to + " " + message);
                _this2.addMessage(sender, message);
            });
        }
    }, {
        key: 'addMessage',
        value: function addMessage(sender, message) {
            var messages = this.state.messages;
            messages.push({
                sender: sender,
                message: message,
                timestamp: this.getTimestamp()
            });
            this.setState({ messages: messages });
        }
    }, {
        key: 'getTimestamp',
        value: function getTimestamp() {
            var date = new Date();

            var hour = date.getHours();
            var period;
            if (hour > 11) {
                hour = hour != 12 ? hour % 12 : 12;
                period = 'PM';
            } else {
                hour = hour < 10 ? '0' + hour : hour;
                period = 'AM';
            }

            var min = date.getMinutes();
            min = min < 10 ? '0' + min : min;

            return hour + ':' + min + ' ' + period;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var messages = this.state.messages.map(function (message, index) {
                var prevMsg = null;
                if (_this3.state.messages.length > 1) {
                    prevMsg = _this3.state.messages[index - 1];
                }
                return _react2.default.createElement(_message2.default, {
                    key: index,
                    sender: message.sender,
                    message: message.message,
                    timestamp: message.timestamp,
                    prevMessage: prevMsg });
            });

            return _react2.default.createElement(
                'div',
                { className: 'chat-area' },
                _react2.default.createElement(_chatLog2.default, { messages: messages }),
                _react2.default.createElement(_chatInput2.default, { activeChannel: this.props.activeChannel, addMessage: this.addMessage })
            );
        }
    }]);

    return ChatArea;
}(_react2.default.Component);

exports.default = ChatArea;