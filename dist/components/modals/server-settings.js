'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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

    var config = props.currentServer;
    _this.state = {
      name: config.name,
      address: config.address,
      nick: config.nick,
      port: config.port || 6667,
      channels: config.channels
    };
    _this.handleSave = _this.handleSave.bind(_this);
    _this.handleInput = _this.handleInput.bind(_this);
    return _this;
  }

  _createClass(ServerSettingsModal, [{
    key: 'handleInput',
    value: function handleInput(event) {
      var newVal = {};
      newVal[event.target.id] = event.target.value;
      this.setState(newVal);
    }
  }, {
    key: 'handleSave',
    value: function handleSave() {
      this.props.updateServer(this.state);
      this.props.onRequestClose();
    }
  }, {
    key: 'renderField',
    value: function renderField(id, label, placeholder) {
      return _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { htmlFor: id },
          label
        ),
        _react2.default.createElement('input', {
          id: id,
          type: 'text',
          placeholder: placeholder,
          value: this.state[id],
          onChange: this.handleInput
        })
      );
    }
  }, {
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
          'button',
          { className: 'close-modal', onClick: this.props.onRequestClose },
          '+'
        ),
        _react2.default.createElement(
          'h1',
          null,
          'Server Settings'
        ),
        _react2.default.createElement(
          'form',
          { className: 'modal-form', onSubmit: function onSubmit(event) {
              return event.preventDefault();
            } },
          this.renderField('nick', 'Nickname', 'SassChan'),
          this.renderField('name', 'Display Name', 'My Server'),
          this.renderField('address', 'Server Address', 'chat.freenode.net'),
          this.renderField('port', 'Port', '6667'),
          _react2.default.createElement(
            'button',
            { onClick: this.handleSave },
            'Save'
          )
        )
      );
    }
  }]);

  return ServerSettingsModal;
}(_react.Component);

exports.default = ServerSettingsModal;


ServerSettingsModal.PropTypes = {
  updateServer: _propTypes2.default.func.isRequired,
  onRequestClose: _propTypes2.default.func.isRequired,
  isOpen: _propTypes2.default.bool.isRequired,
  currentServer: _propTypes2.default.string.isRequired
};