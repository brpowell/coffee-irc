'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTimestamp;
function getTimestamp() {
  var date = new Date();
  var hour = date.getHours();
  var period = void 0;

  if (hour > 11) {
    hour = hour !== 12 ? hour % 12 : 12;
    period = 'PM';
  } else {
    hour = hour < 10 ? '0' + hour : hour;
    period = 'AM';
  }

  var min = date.getMinutes();
  min = min < 10 ? '0' + min : min;

  return hour + ':' + min + ' ' + period;
}