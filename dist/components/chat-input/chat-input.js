'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _coffeeClient = require('../../api/coffee-client.js');

var _coffeeClient2 = _interopRequireDefault(_coffeeClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatInput = function (_React$Component) {
  _inherits(ChatInput, _React$Component);

  function ChatInput(props) {
    _classCallCheck(this, ChatInput);

    var _this = _possibleConstructorReturn(this, (ChatInput.__proto__ || Object.getPrototypeOf(ChatInput)).call(this, props));

    _this.state = { input: '' };
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
        if (this.state.input.startsWith('/')) {
          _coffeeClient2.default.handleCommand(this.state.input, this.props.activeChannel);
        } else if (this.props.activeChannel.length > 0) {
          _coffeeClient2.default.send(this.props.activeChannel, this.state.input);
          this.props.addMessage(_coffeeClient2.default.getNick(), this.props.activeChannel, this.state.input);
        }
        this.setState({ input: '' });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var placeholder = this.props.activeChannel ? 'Send to ' + this.props.activeChannel : 'join a channel or enter a command';
      return _react2.default.createElement(
        'div',
        { className: 'chat-input' },
        _react2.default.createElement('input', {
          value: this.state.input,
          onKeyPress: this.handleSendKey,
          onChange: this.handleInput,
          placeholder: placeholder
        })
      );
    }
  }]);

  return ChatInput;
}(_react2.default.Component);

exports.default = ChatInput;


ChatInput.propTypes = {
  activeChannel: _propTypes2.default.string.isRequired,
  addMessage: _propTypes2.default.func.isRequired
};