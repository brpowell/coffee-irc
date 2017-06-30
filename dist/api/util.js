'use strict';

function getTimestamp() {
    var date = new Date();
    var hour = date.getHours();
    var period;

    if (hour > 11) {
        hour = hour != 12 ? hour % 12 : 12;
        period = 'PM';
    } else {
        hour = hour < 10 ? '0' + hour : hour;
        period = 'AM';
    }

    var min = date.getMinutes();
    min = min < 10 ? '0' + min : min;

    return hour + ':' + min + ' ' + period;
}

function makeMessage(sender, message) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'message';

    return {
        sender: sender,
        message: message,
        timestamp: getTimestamp(),
        type: type
    };
}

module.exports = {
    getTimestamp: getTimestamp,
    makeMessage: makeMessage
};