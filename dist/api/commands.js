'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dummy = require('./dummy');

var _dummy2 = _interopRequireDefault(_dummy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An object mapping command names to functions. Each command accepts a
 * context that holds the client, the current connection, a target, and an argument
 */
var commands = {
  join: function join(context) {
    context.client.join('#' + context.args);
  },
  leave: function leave(context) {
    var target = context.target;
    if (context.args === 'remove' || !target.startsWith('#')) {
      context.client.removeTarget(target);
      return { targets: context.client.getChannels(), activeConversation: '' };
    }
    if (context.target.startsWith('#')) {
      context.conn.part(target);
    }
    return false;
  },
  disconnect: function disconnect(context) {
    context.conn.disconnect();
  },
  msg: function msg(context) {
    var target = context.args.split(' ')[0];
    var message = context.args.replace(target + ' ', '');
    context.client.send(message, target);
  },
  dummy: function dummy() {
    return { messages: _dummy2.default };
  }
};

exports.default = commands;