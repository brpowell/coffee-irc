'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var client = require('electron').remote.getGlobal('client');

var ChannelList = function (_React$Component) {
    _inherits(ChannelList, _React$Component);

    function ChannelList(props) {
        _classCallCheck(this, ChannelList);

        var _this = _possibleConstructorReturn(this, (ChannelList.__proto__ || Object.getPrototypeOf(ChannelList)).call(this, props));

        _this.state = { channels: _this.props.channels, active: _this.props.channels[0] };
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(ChannelList, [{
        key: 'handleClick',
        value: function handleClick(event) {
            var channel = event.target.textContent;
            // client.join(channel);
            this.setState({ active: event.target.textContent });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var channels = this.state.channels.map(function (channel, index) {
                return _react2.default.createElement(
                    'li',
                    {
                        className: channel === _this2.state.active ? "active" : "",
                        onClick: _this2.handleClick },
                    channel
                );
            });
            return _react2.default.createElement(
                'ul',
                { className: 'channel-list' },
                channels
            );
        }
    }]);

    return ChannelList;
}(_react2.default.Component);

var SideBar = function (_React$Component2) {
    _inherits(SideBar, _React$Component2);

    function SideBar(props) {
        _classCallCheck(this, SideBar);

        return _possibleConstructorReturn(this, (SideBar.__proto__ || Object.getPrototypeOf(SideBar)).call(this, props));
    }

    _createClass(SideBar, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'sidebar' },
                _react2.default.createElement(ChannelList, { channels: this.props.channels })
            );
        }
    }]);

    return SideBar;
}(_react2.default.Component);

var Message = function (_React$Component3) {
    _inherits(Message, _React$Component3);

    function Message() {
        _classCallCheck(this, Message);

        return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
    }

    _createClass(Message, [{
        key: 'render',
        value: function render() {
            var className = "message";
            var prevMessage = this.props.prevMessage;
            var stamp;

            if (prevMessage == null || this.props.sender !== prevMessage.sender) {
                stamp = _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        'b',
                        null,
                        this.props.sender
                    ),
                    _react2.default.createElement(
                        'i',
                        { className: 'timestamp-first' },
                        this.props.timestamp
                    ),
                    _react2.default.createElement('br', null)
                );
                className += " message-stamp";
            }
            var style = { float: 'right' };
            return _react2.default.createElement(
                'div',
                { className: className },
                stamp,
                this.props.message,
                _react2.default.createElement(
                    'span',
                    { className: 'timestamp' },
                    this.props.timestamp
                )
            );
        }
    }]);

    return Message;
}(_react2.default.Component);

var ChatInput = function (_React$Component4) {
    _inherits(ChatInput, _React$Component4);

    function ChatInput(props) {
        _classCallCheck(this, ChatInput);

        var _this5 = _possibleConstructorReturn(this, (ChatInput.__proto__ || Object.getPrototypeOf(ChatInput)).call(this, props));

        _this5.state = { input: "" };
        _this5.handleInput = _this5.handleInput.bind(_this5);
        _this5.handleSendKey = _this5.handleSendKey.bind(_this5);
        return _this5;
    }

    _createClass(ChatInput, [{
        key: 'handleInput',
        value: function handleInput(event) {
            this.setState({ input: event.target.value });
        }
    }, {
        key: 'handleSendKey',
        value: function handleSendKey(event) {
            if (event.key === 'Enter' && this.state.input.length > 0) {
                client.say('#cool', this.state.input);
                this.props.addMessage(client.nick, this.state.input);
                this.setState({ input: "" });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'chat-input' },
                _react2.default.createElement('input', {
                    value: this.state.input,
                    onKeyPress: this.handleSendKey,
                    onChange: this.handleInput })
            );
        }
    }]);

    return ChatInput;
}(_react2.default.Component);

var ChatLog = function (_React$Component5) {
    _inherits(ChatLog, _React$Component5);

    function ChatLog() {
        _classCallCheck(this, ChatLog);

        return _possibleConstructorReturn(this, (ChatLog.__proto__ || Object.getPrototypeOf(ChatLog)).apply(this, arguments));
    }

    _createClass(ChatLog, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var node = _reactDom2.default.findDOMNode(this.messagesContainer);
            node.scrollTop = node.scrollHeight;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            return _react2.default.createElement(
                'div',
                { className: 'chat-log', ref: function ref(el) {
                        _this7.messagesContainer = el;
                    } },
                this.props.messages
            );
        }
    }]);

    return ChatLog;
}(_react2.default.Component);

var ChatArea = function (_React$Component6) {
    _inherits(ChatArea, _React$Component6);

    function ChatArea(props) {
        _classCallCheck(this, ChatArea);

        var _this8 = _possibleConstructorReturn(this, (ChatArea.__proto__ || Object.getPrototypeOf(ChatArea)).call(this, props));

        _this8.state = { messages: [] };
        _this8.addMessage = _this8.addMessage.bind(_this8);
        return _this8;
    }

    _createClass(ChatArea, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this9 = this;

            client.addListener('message', function (sender, to, message) {
                _this9.addMessage(sender, message);
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
                hour = hour % 12;
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
            var _this10 = this;

            var messages = this.state.messages.map(function (message, index) {
                var prevMsg = null;
                if (_this10.state.messages.length > 1) {
                    prevMsg = _this10.state.messages[index - 1];
                }
                return _react2.default.createElement(Message, {
                    key: index,
                    sender: message.sender,
                    message: message.message,
                    timestamp: message.timestamp,
                    prevMessage: prevMsg });
            });

            return _react2.default.createElement(
                'div',
                { className: 'chat-area' },
                _react2.default.createElement(ChatLog, { messages: messages }),
                _react2.default.createElement(ChatInput, { addMessage: this.addMessage })
            );
        }
    }]);

    return ChatArea;
}(_react2.default.Component);

var App = function (_React$Component7) {
    _inherits(App, _React$Component7);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            client.join('#cool');
        }
    }, {
        key: 'render',
        value: function render() {
            var channels = ['#cool', '#release', '#random'];
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(SideBar, { channels: channels }),
                _react2.default.createElement(ChatArea, null)
            );
        }
    }]);

    return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('root'));