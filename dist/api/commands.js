'use strict';

var commands = {
    join: function join(arg, client) {
        client.join('#' + arg);
    },
    leave: function leave(arg, client) {
        client.part('#' + arg);
    }
};

function handleCommand(input, client) {
    var rx = /\/\w+/;
    var command = input.match(rx)[0].substring(1);
    var arg = input.replace(input.match(rx)[0] + ' ', '');
    if (command in commands) {
        commands[command](arg, client);
    }
}

module.exports = handleCommand;