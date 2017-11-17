'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _clientManager = require('../../api/client-manager');

var _clientManager2 = _interopRequireDefault(_clientManager);

var _sidebar = require('../../containers/sidebar');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _chatArea = require('../../containers/chat-area');

var _chatArea2 = _interopRequireDefault(_chatArea);

var _serverSettings = require('../modals/server-settings');

var _serverSettings2 = _interopRequireDefault(_serverSettings);

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
      activeConversation: _clientManager2.default.getNick(),
      joinedChannels: [],
      messages: {},
      alertNew: [],
      users: {},
      targets: _clientManager2.default.getChannels(),
      onlineStatus: 'connecting',
      showModal: false,
      currentServer: _clientManager2.default.getServerConfig() };
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

      _clientManager2.default.on('selfMessage', function (to, message) {
        _this2.addMessage(_clientManager2.default.getNick(), to, message);
      });

      // TODO: Don't trigger alert new on join (or leave)
      _clientManager2.default.on('join', function (channel, nick) {
        var message = 'has joined ' + channel;
        _this2.addMessage(nick, channel, message, 'status');
        if (nick === _clientManager2.default.getNick()) _this2.enterConversation(channel);
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
        var args = error.args,
            rawCommand = error.rawCommand;

        var message = 'Error (' + rawCommand + '): ' + args[2];
        _this2.addMessage(_clientManager2.default.getNick(), _this2.state.activeConversation, message, 'error');
      });

      // triggered when user joins but doesn't part...
      _clientManager2.default.on('names', function (channel, nicks) {
        var users = _this2.state.users;
        users[channel] = nicks;
        _this2.setState({ users: users });
      });

      _clientManager2.default.on('motd', function (motd) {
        _this2.setState({ onlineStatus: 'online' });
        // this.addMessage('', '', motd);
      });

      _clientManager2.default.on('nick', function (oldnick, newnick, channels, message) {
        _this2.addMessage(newnick, _this2.activeConversation, message, 'status');
      });

      // Only for other users, can't handle self
      // Client.on('quit', (nick, reason, channels, message) => {
      // });
    }
  }, {
    key: 'bindActions',
    value: function bindActions() {
      this.enterConversation = this.enterConversation.bind(this);
      this.addMessage = this.addMessage.bind(this);
      this.handleDisconnect = this.handleDisconnect.bind(this);
      this.handleConnect = this.handleConnect.bind(this);
      this.handleCommand = this.handleCommand.bind(this);
      this.updateServer = this.updateServer.bind(this);
    }
  }, {
    key: 'enterConversation',
    value: function enterConversation(target) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var activeConversation = force ? target : this.state.activeConversation;
      if (target !== '') {
        var joined = this.state.joinedChannels;
        if (!joined.includes(target) && target.startsWith('#')) {
          joined.push(target);
        }

        var targets = this.state.targets;
        if (!targets.includes(target)) {
          targets.push(target);
        }

        var index = this.state.alertNew.indexOf(target);
        var alertNew = this.state.alertNew;
        if (index > -1) alertNew.splice(index, 1);

        this.setState({ activeConversation: activeConversation, joinedChannels: joined, alertNew: alertNew, targets: targets });
      } else {
        this.setState({ activeConversation: activeConversation });
      }
    }
  }, {
    key: 'leaveChannel',
    value: function leaveChannel(channel) {
      var joined = this.state.joinedChannels;
      var index = joined.indexOf(channel);
      var newActive = '';
      if (index !== -1) joined.splice(index, 1);
      if (this.state.joinedChannels.length > 0) {
        var newIndex = index === 0 ? this.state.joinedChannels.length - 1 : index - 1;
        newActive = this.state.joinedChannels[newIndex];
      }
      this.setState({
        targets: _clientManager2.default.getChannels(),
        joinedChannels: joined,
        activeConversation: newActive });
    }

    /*
     * Adds a message to the app's state. If a user is not browsing the conversation with the
     * sender, then the sender is marked as a new alert
    */

  }, {
    key: 'addMessage',
    value: function addMessage(sender, to, message) {
      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'message';
      var _state = this.state,
          messages = _state.messages,
          alertNew = _state.alertNew,
          activeConversation = _state.activeConversation,
          targets = _state.targets;


      var targetKey = to === _clientManager2.default.getNick() ? sender : to;
      if (!targets.includes(targetKey)) {
        var force = targetKey === to;
        this.enterConversation(targetKey, force);
        _clientManager2.default.saveTarget(targetKey); // Persist direct message user in sidebar
      }

      var newMessage = {
        id: targetKey in messages ? messages[targetKey].length : 0,
        sender: sender,
        message: message,
        timestamp: (0, _util2.default)(),
        type: type
      };

      if (targetKey in messages) {
        messages[targetKey].push(newMessage);
      } else {
        messages[targetKey] = [newMessage];
      }

      if (!alertNew.includes(targetKey) && activeConversation !== targetKey && sender !== _clientManager2.default.getNick()) {
        alertNew.push(targetKey);
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
      this.addMessage(_clientManager2.default.getNick(), this.state.activeConversation, 'has disconnected', 'status');
    }
  }, {
    key: 'handleCommand',
    value: function handleCommand(input, target) {
      var stateResponse = _clientManager2.default.handleCommand(input, target);
      if (stateResponse) {
        this.setState(stateResponse);
      }
    }
  }, {
    key: 'updateServer',
    value: function updateServer(config) {
      var current = this.state.currentServer;
      // TODO: this should probably be done in event handler to prevent changing if failure
      if (current.nick !== config.nick) {
        _clientManager2.default.changeNick(config.nick);
      }
      _clientManager2.default.updateServerConfig(current.name, config);
      this.setState({ currentServer: config });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_serverSettings2.default, {
          isOpen: this.state.showModal,
          onRequestClose: function onRequestClose() {
            return _this3.setState({ showModal: false });
          },
          updateServer: this.updateServer,
          currentServer: this.state.currentServer
        }),
        _react2.default.createElement(_sidebar2.default
        // Actions
        , { enterConversation: this.enterConversation,
          handleDisconnect: this.handleDisconnect,
          handleConnect: this.handleConnect,
          showModal: function showModal() {
            return _this3.setState({ showModal: true });
          }
          // State
          , onlineStatus: this.state.onlineStatus,
          activeConversation: this.state.activeConversation,
          joinedChannels: this.state.joinedChannels,
          targets: this.state.targets,
          alertNew: this.state.alertNew,
          currentServer: this.state.currentServer
        }),
        _react2.default.createElement(_chatArea2.default
        // Actions
        , { addMessage: this.addMessage,
          handleCommand: this.handleCommand
          // State
          , activeConversation: this.state.activeConversation,
          messages: this.state.messages,
          users: this.state.users[this.state.activeConversation]
        })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;