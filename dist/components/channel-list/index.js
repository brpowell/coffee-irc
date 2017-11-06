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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChannelList = function (_React$Component) {
  _inherits(ChannelList, _React$Component);

  function ChannelList(props) {
    _classCallCheck(this, ChannelList);

    var _this = _possibleConstructorReturn(this, (ChannelList.__proto__ || Object.getPrototypeOf(ChannelList)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(ChannelList, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var channel = event.target.textContent;
      if (_clientManager2.default.isConnected()) {
        _clientManager2.default.join(channel);
      }
      if (this.props.activeConversation !== channel) this.props.enterConversation(channel);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var channels = this.props.channels.map(function (channel, index) {
        var isJoined = _this2.props.joinedChannels.includes(channel) ? 'joined' : '';
        var isActive = _this2.props.activeConversation === channel ? 'active' : '';
        var newAlert = _this2.props.alertNew.includes(channel) ? 'alert-new' : '';
        return _react2.default.createElement(
          'li',
          {
            key: index,
            className: isJoined + ' ' + isActive + ' ' + newAlert,
            onClick: _this2.handleClick },
          channel
        );
      });

      return _react2.default.createElement(
        'ul',
        { className: 'channel-list' },
        _react2.default.createElement(
          'div',
          { className: 'title' },
          'Channels'
        ),
        channels,
        _react2.default.createElement(
          'div',
          { className: 'title' },
          'Direct Messages'
        )
      );
    }
  }]);

  return ChannelList;
}(_react2.default.Component);

exports.default = ChannelList;


ChannelList.propTypes = {
  activeConversation: _propTypes2.default.string.isRequired,
  joinedChannels: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  channels: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  enterConversation: _propTypes2.default.func.isRequired,
  alertNew: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired
};