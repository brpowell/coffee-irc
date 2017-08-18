'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _irc = require('irc');

var _irc2 = _interopRequireDefault(_irc);

var _electronSettings = require('electron-settings');

var _electronSettings2 = _interopRequireDefault(_electronSettings);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    this.current = _electronSettings2.default.get('current', '');
    this.disconnect = this.disconnect.bind(this);
    this.connect = this.connect.bind(this);
    Object.entries(_electronSettings2.default.get('servers', {})).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          props = _ref2[1];

      _this.conns[name] = {
        channels: props.channels,
        conn: new _irc2.default.Client(props.address, props.nick, props.options)
      };
      if (_this.current === '') {
        _this.current = name;
        _electronSettings2.default.set('current', name);
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
        conn: new _irc2.default.Client(address, nick)
      };
      this.conns[name] = c;

      var s = { address: address, nick: nick, options: opts, channels: [] };
      _electronSettings2.default.set('servers.' + name, s);
    }

    /**
     * Sends a message to the specified target. A target could be a channel
     * or another user. The message can also be interpreted as a command. Returns
     * true if the input was sent as a message
     * @param {string} message 
     * @param {string} target 
     * @param {function} callback
     * @return {boolean} true if text message, false if command
     * @memberof ClientManager
     */

  }, {
    key: 'send',
    value: function send(message, target) {
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      var wasMessage = false;
      if (message.startsWith('/')) {
        this.handleCommand(message, target);
      } else if (target.length > 0) {
        var c = this.conns[this.current].conn;
        c.say(target, message);
        wasMessage = true;
      }
      if (cb !== undefined) {
        cb();
      }
      return wasMessage;
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
      var context = { arg: arg, target: target, client: this, conn: this.conns[this.current].conn };
      if (command in _commands2.default) {
        _commands2.default[command](context);
      } else {
        context.conn.send(input);
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

    /**
     * Add an event listener to the active server 
     * @param {any} event 
     * @param {any} cb 
     * @memberof ClientManager
     */

  }, {
    key: 'on',
    value: function on(event, cb) {
      var c = this.conns[this.current].conn;
      c.addListener(event, cb);
    }

    /**
     * Join a channel in the active server. Also calls addChanneL()
     * to add channel to the channel list and save in settings
     * @param {any} channel 
     * @memberof ClientManager
     */

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
      var channels = _electronSettings2.default.get(path, []);
      if (channels.indexOf(channel) === -1) {
        channels.push(channel);
      }
      _electronSettings2.default.set(path, channels);
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
      var channels = _electronSettings2.default.get(path, []);
      i = channels.indexOf(channel);
      if (i !== -1) {
        channels.splice(i, 1);
      }
      _electronSettings2.default.set(path, channels);
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

    /**
     * Check if the active server is connected
     * @returns {bool}
     * @memberof ClientManager
     */

  }, {
    key: 'isConnected',
    value: function isConnected() {
      var c = this.conns[this.current].conn;
      return c.conn != null && c.motd !== undefined;
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      var c = this.conns[this.current].conn;
      c.disconnect('bye!', cb);
      c.motd = undefined;
    }
  }, {
    key: 'connect',
    value: function connect() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      var c = this.conns[this.current].conn;
      c.connect(cb);
    }
  }]);

  return ClientManager;
}();

var Client = new ClientManager();

module.exports = Client;