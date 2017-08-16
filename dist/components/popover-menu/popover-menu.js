"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoverMenu = function PopoverMenu(props) {
  return _react2.default.createElement(
    "div",
    { className: "popover-menu" },
    _react2.default.createElement(
      "ul",
      null,
      _react2.default.createElement(
        "li",
        null,
        "Disconnect"
      ),
      _react2.default.createElement(
        "li",
        null,
        "Set Nickname"
      ),
      _react2.default.createElement(
        "li",
        null,
        "Server Settings"
      )
    )
  );
};

exports.default = PopoverMenu;