'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jdenticon = require('jdenticon');

var _jdenticon2 = _interopRequireDefault(_jdenticon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = function (_React$Component) {
  _inherits(Message, _React$Component);

  function Message(props) {
    _classCallCheck(this, Message);

    var _this = _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, props));

    _this.state = { hover: false };
    _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    return _this;
  }

  _createClass(Message, [{
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({ hover: true });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({ hover: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          prevMessage = _props.prevMessage,
          sender = _props.sender,
          timestamp = _props.timestamp,
          message = _props.message;

      var stamp = null;
      // TODO: this is just awful, render method needs to be cleaned up
      if (type === 'status' || prevMessage == null || sender !== prevMessage.sender || sender === prevMessage.sender && type === 'message' && prevMessage.type === 'status') {
        stamp = _react2.default.createElement(
          'div',
          { className: 'message-header' },
          _react2.default.createElement(
            'b',
            null,
            sender
          ),
          _react2.default.createElement(
            'span',
            { className: 'timestamp' },
            timestamp
          ),
          _react2.default.createElement('br', null)
        );
      }
      var avatar = null;
      if (prevMessage == null || sender !== prevMessage.sender || prevMessage.type === 'status') {
        avatar = _jdenticon2.default.toSvg(sender, 45);
      }
      var gutter = avatar ? _react2.default.createElement('div', { className: 'avatar', dangerouslySetInnerHTML: { __html: avatar } }) : _react2.default.createElement(
        'div',
        { className: 'avatar' },
        _react2.default.createElement(
          'span',
          { className: 'timestamp' },
          this.state.hover ? timestamp : ''
        )
      );

      return _react2.default.createElement(
        'div',
        {
          className: 'message',
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave
        },
        gutter,
        _react2.default.createElement(
          'div',
          { className: 'message-content ' + (stamp ? 'message-stamp' : '') },
          stamp,
          _react2.default.createElement(
            'span',
            { className: type !== 'message' ? type : '' },
            message
          )
        )
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
  message: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string.isRequired
};