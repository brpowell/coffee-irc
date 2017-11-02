'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

var _clientManager = require('../../api/client-manager');

var _clientManager2 = _interopRequireDefault(_clientManager);

var _sidebar = require('../../containers/sidebar');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _chatArea = require('../../containers/chat-area');

var _chatArea2 = _interopRequireDefault(_chatArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      activeChannel: '',
      joinedChannels: [],
      messages: {},
      alertNew: [],
      users: {},
      channels: _clientManager2.default.getChannels(),
      onlineStatus: 'connecting' };
    _this.bindActions();
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _clientManager2.default.on('message', function (sender, to, message) {
        _this2.addMessage(sender, to, message);
      });

      // TODO: Don't trigger alert new on join (or leave)
      _clientManager2.default.on('join', function (channel, nick) {
        var message = 'has joined ' + channel;
        _this2.addMessage(nick, channel, message, 'status');
        if (nick === _clientManager2.default.getNick()) _this2.enterChannel(channel);
      });

      _clientManager2.default.on('part', function (channel, nick) {
        var message = 'has left ' + channel;
        _this2.addMessage(nick, channel, message, 'status');
        var users = _this2.state.users;
        delete users[channel][nick];
        _this2.setState({ users: users });
        if (nick === _clientManager2.default.getNick()) _this2.leaveChannel(channel);
      });

      _clientManager2.default.on('error', function (error) {
        console.log(error);
      });

      // triggered when user joins but doesn't part...
      _clientManager2.default.on('names', function (channel, nicks) {
        var users = _this2.state.users;
        users[channel] = nicks;
        _this2.setState({ users: users });
      });

      _clientManager2.default.on('motd', function (motd) {
        _this2.setState({ onlineStatus: 'online' });
      });

      // Only for other users, can't handle self
      // Client.on('quit', (nick, reason, channels, message) => {
      // });
    }
  }, {
    key: 'bindActions',
    value: function bindActions() {
      this.enterChannel = this.enterChannel.bind(this);
      this.addMessage = this.addMessage.bind(this);
      this.handleDisconnect = this.handleDisconnect.bind(this);
      this.handleConnect = this.handleConnect.bind(this);
    }
  }, {
    key: 'enterChannel',
    value: function enterChannel(channel) {
      var joined = this.state.joinedChannels;
      if (joined.indexOf(channel) === -1) {
        joined.push(channel);
      }

      var channels = this.state.channels;
      if (channels.indexOf(channel) === -1) {
        channels.push(channel);
      }

      var index = this.state.alertNew.indexOf(channel);
      var alertNew = this.state.alertNew;
      if (index > -1) alertNew.splice(index, 1);

      this.setState({ activeChannel: channel, joinedChannels: joined, alertNew: alertNew, channels: channels });
    }
  }, {
    key: 'leaveChannel',
    value: function leaveChannel(channel) {
      var joined = this.state.joinedChannels;
      var i = joined.indexOf(channel);
      var newActive = '';
      if (i !== -1) joined.splice(i, 1);
      if (this.state.joinedChannels.length > 0) {
        var newIndex = i == 0 ? this.state.joinedChannels.length - 1 : i - 1;
        newActive = this.state.joinedChannels[newIndex];
      }
      this.setState({
        channels: _clientManager2.default.getChannels(),
        joinedChannels: joined,
        activeChannel: newActive });
    }
  }, {
    key: 'addMessage',
    value: function addMessage(sender, to, message) {
      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'message';

      var messages = this.state.messages;
      var newMessage = {
        id: to in messages ? messages[to].length : 0,
        sender: sender,
        message: message,
        timestamp: (0, _util.getTimestamp)(),
        type: type
      };

      if (to in messages) {
        messages[to].push(newMessage);
      } else {
        messages[to] = [newMessage];
      }

      var alertNew = this.state.alertNew;
      if (alertNew.indexOf(to) === -1 && this.state.activeChannel !== to) {
        alertNew.push(to);
      }

      this.setState({ messages: messages, alertNew: alertNew });
    }
  }, {
    key: 'handleConnect',
    value: function handleConnect() {
      _clientManager2.default.connect();
      this.setState({ onlineStatus: 'online' });
    }
  }, {
    key: 'handleDisconnect',
    value: function handleDisconnect() {
      _clientManager2.default.disconnect();
      this.setState({ onlineStatus: 'offline' });
      this.addMessage(_clientManager2.default.getNick(), this.state.activeChannel, 'has disconnected', 'status');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_sidebar2.default, {
          onlineStatus: this.state.onlineStatus,
          handleDisconnect: this.handleDisconnect,
          handleConnect: this.handleConnect,
          activeChannel: this.state.activeChannel,
          joinedChannels: this.state.joinedChannels,
          enterChannel: this.enterChannel,
          channels: this.state.channels,
          alertNew: this.state.alertNew
        }),
        _react2.default.createElement(_chatArea2.default, {
          addMessage: this.addMessage,
          activeChannel: this.state.activeChannel,
          messages: this.state.messages,
          users: this.state.users[this.state.activeChannel]
        })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;