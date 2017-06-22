'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var client = require('electron').remote.getGlobal('client');

var ChatInput = function (_React$Component) {
    _inherits(ChatInput, _React$Component);

    function ChatInput(props) {
        _classCallCheck(this, ChatInput);

        var _this = _possibleConstructorReturn(this, (ChatInput.__proto__ || Object.getPrototypeOf(ChatInput)).call(this, props));

        _this.state = { input: "" };
        _this.handleInput = _this.handleInput.bind(_this);
        _this.handleSendKey = _this.handleSendKey.bind(_this);
        return _this;
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
                client.say(this.props.activeChannel, this.state.input);
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

exports.default = ChatInput;