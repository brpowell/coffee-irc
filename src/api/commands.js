/**
 * An object mapping command names to functions. Each command accepts a
 * context that holds the client, the current connection, a target, and an argument
 */
const commands = {
  join: (context) => {
    context.client.join(`#${context.arg}`);
  },
  leave: (context) => {
    if (context.arg === 'remove') {
      context.client.removeChannel(context.target);
    }
    context.conn.part(context.target);
  },
};

export default commands;
