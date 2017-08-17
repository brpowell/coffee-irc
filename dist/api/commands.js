'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * An object mapping command names to functions. Each command accepts a
 * context that holds the client, the current connection, a target, and an argument
 */
var commands = {
  join: function join(context) {
    context.client.join('#' + context.arg);
  },
  leave: function leave(context) {
    if (context.arg === 'remove') {
      context.client.removeChannel(context.target);
    }
    context.conn.part(context.target);
  },
  disconnect: function disconnect(context) {
    console.log('got here');
    context.conn.disconnect();
  }
};

exports.default = commands;