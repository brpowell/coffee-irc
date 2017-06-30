const commands = {
    join: (arg, client) => {
        client.join('#'+arg);
    },
    leave: (arg, client) => {
        client.part(arg);
    }
}

function handleCommand(input, client) {
    const rx = /\/\w+/;
    const command = input.match(rx)[0].substring(1);
    const arg = input.replace(input.match(rx)[0]+' ', '');
    if(command in commands) {
        commands[command](arg, client);
    }
}

module.exports = handleCommand;