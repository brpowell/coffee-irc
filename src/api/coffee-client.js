const irc = require('irc')
const settings = require('electron-settings');
const handleCommand = require('./commands.js');


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

    command(command) {
        // var s = command.split(' ');
        // if(s[0].substring(1) === 'join') this.join('#'+s[1]);
        handleCommand(command, this.conns[this.current].conn);
        return true;
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
        var path = 'servers.' + this.current + '.channels'
        var channels = settings.get(path, []);
        if(channels.indexOf(channel) == -1) {
            channels.push(channel);
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
module.exports = Client;