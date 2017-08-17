'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function Modal(props) {
  if (!undefined.props.show) {
    return null;
  }

  return _react2.default.createElement(
    'div',
    { className: 'modal-backdrop' },
    _react2.default.createElement(
      'div',
      { className: 'modal' },
      _react2.default.createElement(
        'div',
        { className: 'modal-header' },
        _react2.default.createElement(
          'button',
          { onClick: undefined.props.onClose },
          'X'
        )
      ),
      undefined.props.children
    )
  );
};

exports.default = Modal;