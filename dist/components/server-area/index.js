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

var _popoverMenu = require('../popover-menu');

var _popoverMenu2 = _interopRequireDefault(_popoverMenu);

var _clientManager = require('../../api/client-manager');

var _clientManager2 = _interopRequireDefault(_clientManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServerArea = function (_React$Component) {
  _inherits(ServerArea, _React$Component);

  function ServerArea(props) {
    _classCallCheck(this, ServerArea);

    var _this = _possibleConstructorReturn(this, (ServerArea.__proto__ || Object.getPrototypeOf(ServerArea)).call(this, props));

    _this.state = { menuOpen: false };
    _this.toggleMenu = _this.toggleMenu.bind(_this);
    _this.closeMenu = _this.toggleMenu.bind(null, false);
    return _this;
  }

  _createClass(ServerArea, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // TODO: display motd info and server stuff on connect
    }
  }, {
    key: 'createMenu',
    value: function createMenu() {
      var menuItems = {};
      if (this.props.onlineStatus === 'online') {
        menuItems.Disconnect = this.props.handleDisconnect;
      } else if (this.props.onlineStatus === 'offline') {
        menuItems.Connect = this.props.handleConnect;
      }

      menuItems['-'] = null;
      menuItems['Set Nickname'] = null;
      menuItems['Server Settings'] = null;

      return _react2.default.createElement(_popoverMenu2.default, {
        menuItems: menuItems,
        closeAction: this.closeMenu
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
      return _react2.default.createElement(
        _reactPopover2.default,
        {
          isOpen: this.state.menuOpen,
          place: 'below',
          className: 'server-menu',
          body: this.createMenu(),
          onOuterAction: this.closeMenu
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
            this.props.onlineStatus === 'online' ? '@' + _clientManager2.default.getNick() : this.props.onlineStatus,
            _react2.default.createElement('div', { className: this.props.onlineStatus })
          )
        )
      );
    }
  }]);

  return ServerArea;
}(_react2.default.Component);

exports.default = ServerArea;


ServerArea.propTypes = {
  onlineStatus: _propTypes2.default.string.isRequired,
  handleDisconnect: _propTypes2.default.func.isRequired,
  handleConnect: _propTypes2.default.func.isRequired
};