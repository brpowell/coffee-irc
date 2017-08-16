'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _clientManager = require('../../api/client-manager.js');

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

    _this.state = { connected: false };
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
    key: 'render',
    value: function render() {
      var nick = _clientManager2.default.getNick();
      return _react2.default.createElement(
        'div',
        { className: 'server-area' },
        _react2.default.createElement(
          'div',
          { className: 'server-info' },
          _clientManager2.default.current,
          ' ',
          _react2.default.createElement(
            'span',
            null,
            '\u2228'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'user-info' },
          nick ? '@' + nick : 'Connecting...',
          _react2.default.createElement('div', { className: this.state.connected ? 'online' : 'offline' })
        )
      );
    }
  }]);

  return ServerArea;
}(_react2.default.Component);

exports.default = ServerArea;