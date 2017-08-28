'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
  }

  _createClass(Modal, [{
    key: 'handleSave',
    value: function handleSave() {
      _clientManager2.default.writeSettings();
    }
  }, {
    key: 'renderServerSettings',
    value: function renderServerSettings() {
      console.log(this.props);
      var settings = _clientManager2.default.getCurrentSettings();
      var formElements = {
        name: { label: 'Display Name', placeholder: 'ExampleNET', defaultValue: _clientManager2.default.current },
        address: { label: 'Server Address', placeholder: 'irc.example.net', defaultValue: settings.address },
        port: { label: 'Port', placeholder: '6667', defaultValue: settings.options.port ? settings.options.port : 6667 }
      };
      var nodes = Object.entries(formElements).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            group = _ref2[1];

        return _react2.default.createElement(
          'div',
          { key: key, className: 'form-group' },
          _react2.default.createElement(
            'label',
            null,
            group.label
          ),
          _react2.default.createElement('input', { type: 'text', placeholder: group.placeholder, defaultValue: group.defaultValue })
        );
      });
      return _react2.default.createElement(
        'div',
        { className: 'modal-form' },
        _react2.default.createElement(
          'form',
          null,
          nodes,
          _react2.default.createElement(
            'div',
            { role: 'button' },
            'Save'
          )
        ),
        _react2.default.createElement(
          'form',
          null,
          nodes
        )
      );
    }

    // TODO: Implement channel list modal
    // renderChannelList() {
    // }

  }, {
    key: 'render',
    value: function render() {
      var modalToRender = this.renderServerSettings();
      if (this.props.renderFor === 'server') {
        modalToRender = this.renderServerSettings();
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
              { onClick: this.props.onClose },
              'X'
            )
          ),
          modalToRender
        )
      );
    }
  }]);

  return Modal;
}(_react2.default.Component);

exports.default = Modal;