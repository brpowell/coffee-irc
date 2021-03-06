'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactPopover = require('react-popover');

var _reactPopover2 = _interopRequireDefault(_reactPopover);

var _popoverMenu = require('../popover-menu/popover-menu.js');

var _popoverMenu2 = _interopRequireDefault(_popoverMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatHeader = function (_React$Component) {
  _inherits(ChatHeader, _React$Component);

  function ChatHeader(props) {
    _classCallCheck(this, ChatHeader);

    var _this = _possibleConstructorReturn(this, (ChatHeader.__proto__ || Object.getPrototypeOf(ChatHeader)).call(this, props));

    _this.state = { usersShowing: false };
    _this.toggleUsers = _this.toggleUsers.bind(_this);
    return _this;
  }

  _createClass(ChatHeader, [{
    key: 'toggleUsers',
    value: function toggleUsers() {
      this.setState({ usersShowing: !this.state.usersShowing });
    }
  }, {
    key: 'render',
    value: function render() {
      var userCount = void 0;
      if (this.props.users) {
        var menu = _react2.default.createElement(_popoverMenu2.default, { menuItems: this.props.users });
        userCount = _react2.default.createElement(
          _reactPopover2.default,
          {
            isOpen: this.state.usersShowing,
            place: 'below',
            className: 'server-menu',
            body: menu,
            onOuterAction: this.toggleUsers.bind(null, false)
          },
          _react2.default.createElement(
            'div',
            { className: 'header-block user-count', onClick: this.toggleUsers },
            _react2.default.createElement('img', { src: '../dist/assets/icons/room2.png', alt: '' }),
            _react2.default.createElement(
              'i',
              null,
              ' ',
              Object.keys(this.props.users).length
            )
          )
        );
      }
      return _react2.default.createElement(
        'div',
        { className: 'chat-header' },
        _react2.default.createElement(
          'div',
          { className: 'header-block' },
          _react2.default.createElement(
            'b',
            null,
            this.props.activeChannel
          )
        ),
        userCount
      );
    }
  }]);

  return ChatHeader;
}(_react2.default.Component);

exports.default = ChatHeader;


ChatHeader.propTypes = {
  activeChannel: _propTypes2.default.string.isRequired,
  users: _propTypes2.default.objectOf(_propTypes2.default.string).isRequired
};