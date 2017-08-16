const irc = require('irc');
const settings = require('electron-settings');

class ClientManager {
  /**
   * Creates an instance of ClientManager.
   * Loads local server settings into the manager 
   * @memberof ClientManager
   */
  constructor() {
    this.conns = {};
    this.current = settings.get('current', '');
    Object.entries(settings.get('servers', {})).forEach(([name, props]) => {
      this.conns[name] = {
        channels: props.channels,
        conn: new irc.Client(props.address, props.nick, props.options),
      };
      if (this.current === '') {
        this.current = name;
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
  addServer(name, address, nick, opts = {}) {
    const c = {
      channels: [],
      conn: new irc.Client(address, nick),
    };
    this.conns[name] = c;

    const s = { address, nick, options: opts, channels: [] };
    settings.set(`servers.${name}`, s);
  }

  /**
   * Sends a message to the specified target. A target could be a channel
   * or another user.
   * @param {string} target 
   * @param {string} message 
   * @memberof ClientManager
   */
  send(target, message) {
    if (message.startsWith('/')) {
      this.handleCommand();
    }
    const c = this.conns[this.current].conn;
    c.say(target, message);
  }

  /**
   * Parse input into a command. If the command exists, it is executed
   * with an optional argument
   * @param {string} input 
   * @param {string} activeChannel 
   * @memberof ClientManager
   */
  handleCommand(input, target) {
    const rx = /\/\w+/;
    const command = input.match(rx)[0].substring(1);
    const arg = input.replace(`${input.match(rx)[0]} `, '');
    const context = { arg, client: this.conns[this.current].conn, activeChannel: target };
    if (command in commands) {
      commands[command](context);
    }
  }

  /**
   * Get user nickname for the active server
   * @returns {string} nickname
   * @memberof ClientManager
   */
  getNick() {
    return this.conns[this.current].conn.nick;
  }

  on(event, cb) {
    const c = this.conns[this.current].conn;
    c.addListener(event, cb);
  }

  join(channel) {
    const c = this.conns[this.current].conn;
    c.join(channel);
    this.addChannel(channel);
  }

  /**
   * Add a channel to the active server
   * @param {string} channel 
   * @memberof ClientManager
   */
  addChannel(channel) {
    const path = `servers.${this.current}.channels`;
    const channels = settings.get(path, []);
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
  removeChannel(channel) {
    let i = this.conns[this.current].channels.indexOf(channel);
    if (i !== -1) {
      this.conns[this.current].channels.splice(i, 1);
    }

    const path = `servers.${this.current}.channels`;
    const channels = settings.get(path, []);
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
  getChannels() {
    return this.conns[this.current].channels;
  }

  isConnected() {
    const c = this.conns[this.current].conn;
    return (c.conn != null && c.motd !== undefined);
  }
}

const Client = new ClientManager();

const commands = {
  join: (context) => {
    Client.join(`#${context.arg}`);
  },
  leave: (context) => {
    if (context.arg === 'remove') {
      Client.removeChannel(context.activeChannel);
    }
    context.client.part(context.activeChannel);
  },
};

module.exports = Client;
