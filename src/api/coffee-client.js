const irc = require('irc')
const settings = require('electron-settings');

class ClientManager {
    constructor() {
        this.conns = {};
        this.current = settings.get('current', '');
        this.populateServers();
    }

    populateServers() {
        var servers = settings.get('servers', {});
        for(var k in servers) {
            var s = servers[k];
            var c = { 
                channels: servers[k].channels, 
                conn: new irc.Client(s.address, s.nick, s.options)
            };
            this.conns[k] = c;
            if(this.current == '') {
                this.current = k
                settings.set('current', k);
            }
        }
    }

    addServer(name, address, nick, opts={}) {
        var c = { 
            channels: [],
            conn: new irc.Client(address, nick)
        };
        this.conns[name] = c;

        var s = { address: address, nick: nick, options: opts };
        settings.set('servers.'+name, s);
    }

    send(target, message) {
        var c = this.conns[this.current].conn;
        c.say(target, message);
    }

    handleCommand(input, activeChannel) {
        var rx = /\/\w+/;
        var command = input.match(rx)[0].substring(1);
        var arg = input.replace(input.match(rx)[0]+' ', '');
        var context = {arg: arg, client: this.conns[this.current].conn, activeChannel: activeChannel};
        if(command in commands) {
            commands[command](context);
        }
    }

    getNick() {
        return this.conns[this.current].conn.nick;
    }

    on(event, cb) {
        var c = this.conns[this.current].conn;
        c.addListener(event, cb);
    }

    join(channel) {
        var c = this.conns[this.current].conn;
        c.join(channel);
        this.saveChannel(channel);
    }

    saveChannel(channel) {
        var path = 'servers.' + this.current + '.channels'
        var channels = settings.get(path, []);
        if(channels.indexOf(channel) == -1) {
            channels.push(channel);
        }
        settings.set(path, channels);
    }

    removeChannel(channel) {
        var i = this.conns[this.current].channels.indexOf(channel);
        if(i != -1) {
            this.conns[this.current].channels.splice(i, 1);
        }

        var path = 'servers.' + this.current + '.channels'
        var channels = settings.get(path, []);
        var i = channels.indexOf(channel);
        if(i != -1) {
            channels.splice(i, 1);
        }
        settings.set(path, channels);
    }

    getChannels() {
        return this.conns[this.current].channels;
    }

    isConnected() {
        var c = this.conns[this.current].conn;
        return (c.conn != null && c.motd != undefined);
    }
}

var Client = new ClientManager();

const commands = {
    join: (context) => {
        Client.join('#'+context.arg);
    },
    leave: (context) => {
        if(context.arg === 'remove') {
            Client.removeChannel(context.activeChannel);
        }
        context.client.part(context.activeChannel);
    }
}

module.exports = Client;