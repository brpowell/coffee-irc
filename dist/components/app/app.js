'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sidebar = require('../sidebar/sidebar.js');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _chatArea = require('../chat-area/chat-area.js');

var _chatArea2 = _interopRequireDefault(_chatArea);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var client = require('electron').remote.getGlobal('client');

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = { activeChannel: "", joinedChannels: [], messages: {}, alertNew: [] };
        _this.enterChannel = _this.enterChannel.bind(_this);
        _this.addMessage = _this.addMessage.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            client.addListener('message', function (sender, to, message) {
                console.log(sender + " " + to + " " + message);
                _this2.addMessage(sender, to, message);
            });

            client.addListener('join', function (channel, nick, message) {
                console.log(nick + " has joined " + channel);
            });
        }
    }, {
        key: 'enterChannel',
        value: function enterChannel(channel) {
            var joined = this.state.joinedChannels;
            if (joined.indexOf(channel) == -1) {
                client.join(channel);
                joined.push(channel);
            }

            var index = this.state.alertNew.indexOf(channel);
            var alertNew = this.state.alertNew;
            if (index > -1) alertNew.splice(index, 1);

            this.setState({ activeChannel: channel, joinedChannels: joined, alertNew: alertNew });
        }
    }, {
        key: 'addMessage',
        value: function addMessage(sender, to, message) {
            var messages = this.state.messages;
            var newMessage = {
                sender: sender,
                message: message,
                timestamp: (0, _util.getTimestamp)()
            };

            if (to in messages) messages[to].push(newMessage);else messages[to] = [newMessage];

            var alertNew = this.state.alertNew;
            if (alertNew.indexOf(to) == -1 && this.state.activeChannel != to) {
                alertNew.push(to);
            }

            this.setState({ messages: messages, alertNew: alertNew });
        }
    }, {
        key: 'render',
        value: function render() {
            var channels = ['#cool', '#release', '#random'];
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_sidebar2.default, {
                    activeChannel: this.state.activeChannel,
                    channels: channels,
                    joinedChannels: this.state.joinedChannels,
                    enterChannel: this.enterChannel,
                    alertNew: this.state.alertNew }),
                _react2.default.createElement(_chatArea2.default, {
                    addMessage: this.addMessage,
                    activeChannel: this.state.activeChannel,
                    messages: this.state.messages })
            );
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;