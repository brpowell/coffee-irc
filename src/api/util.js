function getTimestamp() {
  const date = new Date();
  let hour = date.getHours();
  let period;

  if (hour > 11) {
    hour = hour !== 12 ? hour % 12 : 12;
    period = 'PM';
  } else {
    hour = hour < 10 ? `0${hour}` : hour;
    period = 'AM';
  }

  let min = date.getMinutes();
  min = min < 10 ? `0${min}` : min;

  return `${hour}:${min} ${period}`;
}

function makeMessage(sender, message, type = 'message') {
  return {
    sender,
    message,
    timestamp: getTimestamp(),
    type,
  };
}

module.exports = {
  getTimestamp,
  makeMessage,
};
