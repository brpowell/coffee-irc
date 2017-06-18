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

var irc = require('irc');
var client = require('electron').remote.getGlobal('client');

var Message = function (_React$Component) {
    _inherits(Message, _React$Component);

    function Message() {
        _classCallCheck(this, Message);

        return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
    }

    _createClass(Message, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'message' },
                _react2.default.createElement(
                    'span',
                    null,
                    this.props.sender
                ),
                ': ',
                this.props.message
            );
        }
    }]);

    return Message;
}(_react2.default.Component);

var App = function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App(props) {
        _classCallCheck(this, App);

        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this2.state = { input: "", messages: [] };
        _this2.handleInput = _this2.handleInput.bind(_this2);
        _this2.handleSendKey = _this2.handleSendKey.bind(_this2);
        return _this2;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            client.join('#cool');
            client.addListener('message', function (sender, to, message) {
                console.log(sender + " => " + to + ": " + message);
                _this3.addMessage(sender, message);
            });
        }
    }, {
        key: 'addMessage',
        value: function addMessage(sender, message) {
            var messages = this.state.messages;
            messages.push({ sender: sender, message: message });
            this.setState({ messages: messages });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var node = _reactDom2.default.findDOMNode(this.messagesContainer);
            node.scrollTop = node.scrollHeight;
        }
    }, {
        key: 'handleSendKey',
        value: function handleSendKey(event) {
            if (event.key === 'Enter') {
                client.say('#cool', this.state.input);
                this.addMessage(client.nick, this.state.input);
                this.setState({ input: "" });
            }
        }
    }, {
        key: 'handleInput',
        value: function handleInput(event) {
            this.setState({ input: event.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var messages = this.state.messages.map(function (message) {
                return _react2.default.createElement(Message, { sender: message.sender, message: message.message });
            });
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'chat-log', ref: function ref(el) {
                            _this4.messagesContainer = el;
                        } },
                    messages
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'chat-input' },
                    _react2.default.createElement('input', { value: this.state.input, onKeyPress: this.handleSendKey, onChange: this.handleInput })
                )
            );
        }
    }]);

    return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('root'));