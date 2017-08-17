'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPopover = require('react-popover');

var _reactPopover2 = _interopRequireDefault(_reactPopover);

var _popoverMenu = require('../popover-menu/popover-menu.js');

var _popoverMenu2 = _interopRequireDefault(_popoverMenu);

var _clientManager = require('../../api/client-manager');

var _clientManager2 = _interopRequireDefault(_clientManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var menuItems = {
  Disconnect: _clientManager2.default.disconnect,
  'Set Nickname': null,
  'Server Settings': null
};

var ServerArea = function (_React$Component) {
  _inherits(ServerArea, _React$Component);

  function ServerArea(props) {
    _classCallCheck(this, ServerArea);

    var _this = _possibleConstructorReturn(this, (ServerArea.__proto__ || Object.getPrototypeOf(ServerArea)).call(this, props));

    _this.state = { connected: false, menuOpen: false };
    _this.toggleMenu = _this.toggleMenu.bind(_this);
    return _this;
  }

  _createClass(ServerArea, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // TODO: display motd info and server stuff on connect
      _clientManager2.default.on('motd', function () {
        _this2.setState({ connected: true });
      });
    }
  }, {
    key: 'toggleMenu',
    value: function toggleMenu() {
      this.setState({ menuOpen: !this.state.menuOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      var nick = _clientManager2.default.getNick();
      var menu = _react2.default.createElement(_popoverMenu2.default, { menuItems: menuItems, closeAction: this.toggleMenu.bind(null, false) });
      return _react2.default.createElement(
        _reactPopover2.default,
        {
          isOpen: this.state.menuOpen,
          place: 'below',
          className: 'server-menu',
          body: menu,
          onOuterAction: this.toggleMenu.bind(null, false)
        },
        _react2.default.createElement(
          'div',
          { role: 'button', className: 'server-area', onClick: this.toggleMenu, tabIndex: 0 },
          _react2.default.createElement(
            'div',
            { className: 'server-info' },
            _clientManager2.default.current
          ),
          _react2.default.createElement(
            'div',
            { className: 'user-info' },
            nick ? '@' + nick : 'Connecting...',
            _react2.default.createElement('div', { className: this.state.connected ? 'online' : 'offline' })
          )
        )
      );
    }
  }]);

  return ServerArea;
}(_react2.default.Component);

exports.default = ServerArea;