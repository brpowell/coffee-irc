import sampleMessages from './dummy';

/**
 * An object mapping command names to functions. Each command accepts a
 * context that holds the client, the current connection, a target, and an argument
 */
const commands = {
  join: (context) => {
    context.client.join(`#${context.args}`);
  },
  leave: (context) => {
    const target = context.target;
    if (context.args === 'remove' || !target.startsWith('#')) {
      context.client.removeTarget(target);
      return { targets: context.client.getChannels(), activeConversation: '' };
    }
    if (context.target.startsWith('#')) {
      context.conn.part(target);
    }
    return false;
  },
  disconnect: (context) => {
    context.conn.disconnect();
  },
  msg: (context) => {
    const target = context.args.split(' ')[0];
    const message = context.args.replace(`${target} `, '');
    context.client.send(message, target);
  },
  dummy: () => ({ messages: sampleMessages }),
};

export default commands;
