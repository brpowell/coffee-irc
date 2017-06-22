"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = function (_React$Component) {
    _inherits(Message, _React$Component);

    function Message(props) {
        _classCallCheck(this, Message);

        var _this = _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, props));

        _this.handleHover = _this.handleHover.bind(_this);
        return _this;
    }

    _createClass(Message, [{
        key: "handleHover",
        value: function handleHover(event) {}
    }, {
        key: "render",
        value: function render() {
            var className = "message";
            var prevMessage = this.props.prevMessage;
            var stamp;

            if (prevMessage == null || this.props.sender !== prevMessage.sender) {
                stamp = _react2.default.createElement(
                    "span",
                    null,
                    _react2.default.createElement(
                        "b",
                        null,
                        this.props.sender
                    ),
                    _react2.default.createElement(
                        "i",
                        { className: "timestamp-first" },
                        this.props.timestamp
                    ),
                    _react2.default.createElement("br", null)
                );
                className += " message-stamp";
            }
            var style = { float: 'right' };
            return _react2.default.createElement(
                "div",
                { className: className, onMouseEnter: this.handleHover },
                stamp,
                this.props.message,
                _react2.default.createElement(
                    "span",
                    { className: "timestamp" },
                    this.props.timestamp
                )
            );
        }
    }]);

    return Message;
}(_react2.default.Component);

exports.default = Message;