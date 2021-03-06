'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _clientManager = require('../../api/client-manager');

var _clientManager2 = _interopRequireDefault(_clientManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = function (_React$Component) {
  _inherits(Message, _React$Component);

  function Message(props) {
    _classCallCheck(this, Message);

    var _this = _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, props));

    _this.state = { showTimestamp: false };
    _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    return _this;
  }

  _createClass(Message, [{
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({ showTimestamp: true });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({ showTimestamp: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'message';
      var prevMessage = this.props.prevMessage;
      var stamp = null;
      if (this.props.type === 'status' || prevMessage == null || this.props.sender !== prevMessage.sender || this.props.sender === prevMessage.sender && this.props.type === 'message' && prevMessage.type === 'status') {
        stamp = _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            'b',
            { className: this.props.sender === _clientManager2.default.getNick() ? 'sender-name' : '' },
            this.props.sender
          ),
          _react2.default.createElement(
            'i',
            { className: 'timestamp-first' },
            this.props.timestamp
          ),
          _react2.default.createElement('br', null)
        );
        className += ' message-stamp';
      }

      return _react2.default.createElement(
        'div',
        {
          className: className,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave
        },
        stamp,
        _react2.default.createElement(
          'div',
          { className: this.props.type === 'status' ? 'status' : '' },
          this.props.message
        ),
        this.state.showTimestamp ? _react2.default.createElement(
          'i',
          { className: 'timestamp' },
          this.props.timestamp
        ) : null
      );
    }
  }]);

  return Message;
}(_react2.default.Component);

exports.default = Message;


Message.defaultProps = {
  prevMessage: null
};

Message.propTypes = {
  prevMessage: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),
  sender: _propTypes2.default.string.isRequired,
  timestamp: _propTypes2.default.string.isRequired,
  message: _propTypes2.default.string.isRequired
};