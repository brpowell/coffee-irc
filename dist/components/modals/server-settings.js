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

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServerSettingsModal = function (_Component) {
  _inherits(ServerSettingsModal, _Component);

  function ServerSettingsModal(props) {
    _classCallCheck(this, ServerSettingsModal);

    var _this = _possibleConstructorReturn(this, (ServerSettingsModal.__proto__ || Object.getPrototypeOf(ServerSettingsModal)).call(this, props));

    var settings = _clientManager2.default.getSettings(_clientManager2.default.current);
    console.log(settings);
    _this.state = {
      name: _clientManager2.default.current,
      address: settings.address,
      nick: settings.nick,
      port: settings.port ? settings.port : 6667
    };
    return _this;
  }

  _createClass(ServerSettingsModal, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactModal2.default,
        {
          isOpen: this.props.isOpen,
          onRequestClose: this.props.onRequestClose,
          closeTimeoutMS: 200,
          contentLabel: 'Server Settings'
        },
        _react2.default.createElement(
          'h1',
          null,
          'Server Settings'
        ),
        _react2.default.createElement(
          'form',
          null,
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement('input', { type: 'text', placeholder: 'Display Name', value: this.state.name })
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement('input', { type: 'text', placeholder: 'Server Address', value: this.state.address })
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement('input', { type: 'text', placeholder: 'Port', value: this.state.port })
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement('input', { type: 'text', placeholder: 'Nickname', value: this.state.nick })
          ),
          _react2.default.createElement(
            'button',
            null,
            'Save'
          )
        )
      );
    }
  }]);

  return ServerSettingsModal;
}(_react.Component);

exports.default = ServerSettingsModal;