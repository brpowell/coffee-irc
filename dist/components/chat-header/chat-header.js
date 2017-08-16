'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChatHeader = function ChatHeader(props) {
  var userCount = void 0;
  if (props.users) {
    userCount = _react2.default.createElement(
      'div',
      { className: 'user-count' },
      _react2.default.createElement('img', { src: '../dist/assets/icons/user.png', alt: '' }),
      _react2.default.createElement(
        'i',
        null,
        ' ',
        Object.keys(props.users).length
      )
    );
  }
  return _react2.default.createElement(
    'div',
    { className: 'chat-header' },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'b',
        null,
        props.activeChannel
      ),
      userCount
    )
  );
};

ChatHeader.propTypes = {
  activeChannel: _propTypes2.default.string.isRequired
};

exports.default = ChatHeader;