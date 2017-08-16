'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var irc = require('irc');
var settings = require('electron-settings');

var ClientManager = function () {
  /**
   * Creates an instance of ClientManager.
   * Loads local server settings into the manager 
   * @memberof ClientManager
   */
  function ClientManager() {
    var _this = this;

    _classCallCheck(this, ClientManager);

    this.conns = {};
    this.current = settings.get('current', '');
    Object.entries(settings.get('servers', {})).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          props = _ref2[1];

      _this.conns[name] = {
        channels: props.channels,
        conn: new irc.Client(props.address, props.nick, props.options)
      };
      if (_this.current === '') {
        _this.current = name;
        settings.set('current', name);
      }
    });
  }

  /**
   * Add a server to the client manager. 
   * @param {string} name 
   * @param {string} address 
   * @param {string} nick 
   * @param {Object.<string, any>} [opts={}] 
   * @memberof ClientManager
   */


  _createClass(ClientManager, [{
    key: 'addServer',
    value: function addServer(name, address, nick) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var c = {
        channels: [],
        conn: new irc.Client(address, nick)
      };
      this.conns[name] = c;

      var s = { address: address, nick: nick, options: opts, channels: [] };
      settings.set('servers.' + name, s);
    }

    /**
     * Sends a message to the specified target. A target could be a channel
     * or another user.
     * @param {string} target 
     * @param {string} message 
     * @memberof ClientManager
     */

  }, {
    key: 'send',
    value: function send(target, message) {
      if (message.startsWith('/')) {
        this.handleCommand();
      }
      var c = this.conns[this.current].conn;
      c.say(target, message);
    }

    /**
     * Parse input into a command. If the command exists, it is executed
     * with an optional argument
     * @param {string} input 
     * @param {string} activeChannel 
     * @memberof ClientManager
     */

  }, {
    key: 'handleCommand',
    value: function handleCommand(input, target) {
      var rx = /\/\w+/;
      var command = input.match(rx)[0].substring(1);
      var arg = input.replace(input.match(rx)[0] + ' ', '');
      var context = { arg: arg, client: this.conns[this.current].conn, activeChannel: target };
      if (command in commands) {
        commands[command](context);
      }
    }

    /**
     * Get user nickname for the active server
     * @returns {string} nickname
     * @memberof ClientManager
     */

  }, {
    key: 'getNick',
    value: function getNick() {
      return this.conns[this.current].conn.nick;
    }
  }, {
    key: 'on',
    value: function on(event, cb) {
      var c = this.conns[this.current].conn;
      c.addListener(event, cb);
    }
  }, {
    key: 'join',
    value: function join(channel) {
      var c = this.conns[this.current].conn;
      c.join(channel);
      this.addChannel(channel);
    }

    /**
     * Add a channel to the active server
     * @param {string} channel 
     * @memberof ClientManager
     */

  }, {
    key: 'addChannel',
    value: function addChannel(channel) {
      var path = 'servers.' + this.current + '.channels';
      var channels = settings.get(path, []);
      if (channels.indexOf(channel) === -1) {
        channels.push(channel);
      }
      settings.set(path, channels);
    }

    /**
     * Remove a channel from the active server
     * @param {string} channel 
     * @memberof ClientManager
     */

  }, {
    key: 'removeChannel',
    value: function removeChannel(channel) {
      var i = this.conns[this.current].channels.indexOf(channel);
      if (i !== -1) {
        this.conns[this.current].channels.splice(i, 1);
      }

      var path = 'servers.' + this.current + '.channels';
      var channels = settings.get(path, []);
      i = channels.indexOf(channel);
      if (i !== -1) {
        channels.splice(i, 1);
      }
      settings.set(path, channels);
    }

    /**
     * Get the channels of the active server
     * @returns {Array.<string>}
     * @memberof ClientManager
     */

  }, {
    key: 'getChannels',
    value: function getChannels() {
      return this.conns[this.current].channels;
    }
  }, {
    key: 'isConnected',
    value: function isConnected() {
      var c = this.conns[this.current].conn;
      return c.conn != null && c.motd !== undefined;
    }
  }]);

  return ClientManager;
}();

var Client = new ClientManager();

var commands = {
  join: function join(context) {
    Client.join('#' + context.arg);
  },
  leave: function leave(context) {
    if (context.arg === 'remove') {
      Client.removeChannel(context.activeChannel);
    }
    context.client.part(context.activeChannel);
  }
};

module.exports = Client;