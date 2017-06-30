'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var irc = require('irc');
var settings = require('electron-settings');
var handleCommand = require('./commands.js');

var ClientManager = function () {
    function ClientManager() {
        _classCallCheck(this, ClientManager);

        this.conns = {};
        this.current = settings.get('current', '');
        this.populateServers();
    }

    _createClass(ClientManager, [{
        key: 'populateServers',
        value: function populateServers() {
            var servers = settings.get('servers', {});
            for (var k in servers) {
                var s = servers[k];
                var c = {
                    channels: servers[k].channels,
                    conn: new irc.Client(s.address, s.nick, s.options)
                };
                this.conns[k] = c;
                if (this.current == '') {
                    this.current = k;
                    settings.set('current', k);
                }
            }
        }
    }, {
        key: 'addServer',
        value: function addServer(name, address, nick) {
            var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            var c = {
                channels: [],
                conn: new irc.Client(address, nick)
            };
            this.conns[name] = c;

            var s = { address: address, nick: nick, options: opts };
            settings.set('servers.' + name, s);
        }
    }, {
        key: 'send',
        value: function send(target, message) {
            var c = this.conns[this.current].conn;
            c.say(target, message);
        }
    }, {
        key: 'command',
        value: function command(_command) {
            // var s = command.split(' ');
            // if(s[0].substring(1) === 'join') this.join('#'+s[1]);
            handleCommand(_command, this.conns[this.current].conn);
            return true;
        }
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
            var path = 'servers.' + this.current + '.channels';
            var channels = settings.get(path, []);
            if (channels.indexOf(channel) == -1) {
                channels.push(channel);
            }
            settings.set(path, channels);
        }
    }, {
        key: 'getChannels',
        value: function getChannels() {
            return this.conns[this.current].channels;
        }
    }, {
        key: 'isConnected',
        value: function isConnected() {
            var c = this.conns[this.current].conn;
            return c.conn != null && c.motd != undefined;
        }
    }]);

    return ClientManager;
}();

var Client = new ClientManager();
module.exports = Client;