import irc from 'irc';
import settings from 'electron-settings';
import _ from 'lodash';
import commands from './commands';

class ClientManager {
  /**
   * Creates an instance of ClientManager.
   * Loads local server settings into the manager 
   * @memberof ClientManager
   */
  constructor() {
    this.conns = {};
    this.current = settings.get('current', '');
    this.disconnect = this.disconnect.bind(this);
    this.connect = this.connect.bind(this);
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
   * or another user. The message can also be interpreted as a command. Returns
   * true if the input was sent as a message
   * @param {string} message 
   * @param {string} target 
   * @param {function} callback
   * @return {boolean} true if text message, false if command
   * @memberof ClientManager
   */
  send(message, target, cb = undefined) {
    if (target.length > 0) {
      const c = this.conns[this.current].conn;
      c.say(target, message);
    }
    if (cb !== undefined) {
      cb();
    }
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
    const args = input.replace(`${input.match(rx)[0]} `, '');
    const context = { args, target, client: this, conn: this.conns[this.current].conn };
    return command in commands ? commands[command](context) : false;
  }

  /**
   * Get user nickname for the active server
   * @returns {string} nickname
   * @memberof ClientManager
   */
  getNick() {
    return this.conns[this.current].conn.nick;
  }

  changeNick(nick) {
    this.conns[this.current].conn.send("NICK", nick);
  }

  /**
   * Add an event listener to the active server 
   * @param {any} event 
   * @param {any} cb 
   * @memberof ClientManager
   */
  on(event, cb) {
    const c = this.conns[this.current].conn;
    c.addListener(event, cb);
  }

  /**
   * Join a channel in the active server. Also calls addChannel()
   * to add channel to the channel list and save in settings
   * @param {any} channel 
   * @memberof ClientManager
   */
  join(channel) {
    const c = this.conns[this.current].conn;
    c.join(channel);
    this.saveTarget(channel);
  }

  /**
   * Add a conversation target to the active server
   * @param {string} channel 
   * @memberof ClientManager
   */
  saveTarget(target) {
    const path = `servers.${this.current}.channels`;
    const channels = settings.get(path, []);
    if (channels.indexOf(target) === -1) {
      channels.push(target);
    }
    settings.set(path, channels);
  }

  /**
   * Remove a conversation target from the active server
   * @param {string} channel 
   * @memberof ClientManager
   */
  removeTarget(target) {
    let i = this.conns[this.current].channels.indexOf(target);
    if (i !== -1) {
      this.conns[this.current].channels.splice(i, 1);
    }

    const path = `servers.${this.current}.channels`;
    const channels = settings.get(path, []);
    i = channels.indexOf(target);
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

  getServerConfig(server) {
    const active = server || this.current;
    const config = settings.get(`servers.${active}`);
    config.name = active;
    return config;
  }

  updateServerConfig(server, config) {
    settings.delete(`servers.${server}`);
    if (server === this.current) {
      this.current = config.name;
      settings.set('current', this.current);
    }
    settings.set(`servers.${config.name}`, _.omit(config, 'name'));
  }

  /**
   * Check if the active server is connected
   * @returns {bool}
   * @memberof ClientManager
   */
  isConnected() {
    const c = this.conns[this.current].conn;
    return (c.conn != null && c.motd !== undefined);
  }

  disconnect(cb = undefined) {
    const c = this.conns[this.current].conn;
    c.disconnect('bye!', cb);
    c.motd = undefined;
  }

  connect(cb = undefined) {
    const c = this.conns[this.current].conn;
    c.connect(cb);
  }
}

const Client = new ClientManager();

module.exports = Client;
