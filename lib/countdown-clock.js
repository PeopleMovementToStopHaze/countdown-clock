'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CountdownClock = function (_Component) {
  (0, _inherits3.default)(CountdownClock, _Component);

  function CountdownClock() {
    (0, _classCallCheck3.default)(this, CountdownClock);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CountdownClock).call(this));

    _this.initializeClock = function () {
      var time = _this._getTime(_this.state.deadline);

      _this.setState({
        year: time.years,
        day: time.days,
        hour: ('0' + time.hours).slice(-2),
        minute: ('0' + time.minutes).slice(-2),
        second: ('0' + time.seconds).slice(-2)
      }, _this._updateClock);
    };

    _this._updateClock = function () {
      var time = _this._getTime(_this.state.deadline);

      _this.setState({
        year: time.years,
        day: time.days,
        hour: ('0' + time.hours).slice(-2),
        minute: ('0' + time.minutes).slice(-2),
        second: ('0' + time.seconds).slice(-2)
      });

      var periodsConvertUnit = [1, 365, 24, 60, 60];
      var periodDenominator = periodsConvertUnit.reduce(function (preValue, currentValue, index) {
        return preValue * (_this._parsedFormatArr[index] ? currentValue : 1);
      });
      var period = _this._yearInSeconds / periodDenominator;
      _this._clearTimer();
      _this._drawTimer();

      var timeinterval = setTimeout(_this._updateClock.bind(_this), 1000 * period);
      if (time.total <= 0) {
        clearTimeout(timeinterval);
      }
    };

    _this._parseFormat = function (format) {
      var parsedFormat = format.split('-').map(function (form) {
        return (0, _defineProperty3.default)({}, form, form);
      }).reduce(function (previousValue, currentValue) {
        return (0, _assign2.default)({}, previousValue, currentValue);
      });

      return parsedFormat;
    };

    _this._setupCanvas = function () {
      _this._parsedFormatArr.map(function (format) {
        var propsName = '_' + format + 'CanvasContext';
        var refsName = format + '_canvas';
        var canvas = _reactDom2.default.findDOMNode(_this.refs[refsName]);
        _this[propsName] = canvas.getContext('2d');
        _this[propsName].textAlign = 'center';
        _this[propsName].textBaseline = 'middle';
        _this[propsName].font = 'bold 20px Arial';
      });
    };

    _this._drawBackground = function () {
      _this._parsedFormatArr.map(function (format) {
        var propsName = '_' + format + 'CanvasContext';
        _this[propsName].beginPath();
        _this[propsName].globalAlpha = 0;
        _this[propsName].fillStyle = _this.props.colorFinished;
        _this[propsName].arc(_this._radius, _this._radius, _this._radius, 0, Math.PI * 2, false);
        _this[propsName].arc(_this._radius, _this._radius, _this._radius / 1.3, Math.PI * 2, 0, true);
        _this[propsName].fill();
      });
    };

    _this._clearTimer = function () {
      _this._parsedFormatArr.map(function (format) {
        var propsName = '_' + format + 'CanvasContext';
        _this[propsName].clearRect(0, 0, 2000, 2000);
      });
      _this._drawBackground();
    };

    _this._drawTimer = function () {
      _this._parsedFormatArr.map(function (format) {
        var timeMeasure = _this._timeMeasure[format];
        var percent = 2 * parseInt(_this.state[format], 10) / timeMeasure - 4.5;
        var propsName = '_' + format + 'CanvasContext';
        _this[propsName].globalAlpha = 1;
        _this[propsName].fillStyle = _this.props.textColor;
        _this[propsName].font = _this.props.fontSize + 'px ' + 'Roboto';
        _this[propsName].fillText(_this.state[format], _this._radius, _this._radius - 15);
        _this[propsName].font = _this.props.fontSize * 3 / 4 + 'px ' + 'Roboto';
        _this[propsName].fillText(format, _this._radius, _this._radius + 15);
        _this[propsName].fillStyle = _this.props.colorGoing;
        _this[propsName].beginPath();
        _this[propsName].arc(_this._radius, _this._radius, _this._radius, Math.PI * 1.5, Math.PI * percent, false);
        _this[propsName].arc(_this._radius, _this._radius, _this._radius / 1.3, Math.PI * percent, Math.PI * 1.5, true);
        _this[propsName].fill();
      });
    };

    _this._yearInSeconds = 365 * 24 * 60 * 60;
    _this._format;
    _this._parsedFormatArr;
    _this._radius;
    _this._fraction;
    _this._secondCanvasContext;
    _this._minuteCanvasContext;
    _this._hourCanvasContext;
    _this._dayCanvasContext;
    _this._yearCanvasContext;
    _this._timeMeasure = {
      second: 60,
      minute: 60,
      hour: 24,
      day: 365,
      year: 5
    };
    _this.state = {
      year: '',
      day: '',
      hour: '',
      minute: '',
      second: ''
    };
    return _this;
  }

  (0, _createClass3.default)(CountdownClock, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._radius = parseInt(this.props.size, 10) / 2;
      this._format = this.props.options.format;
      var parsedFormat = this._parseFormat(this._format);
      this._parsedFormatArr = (0, _keys2.default)(parsedFormat).filter(function (key) {
        return parsedFormat[key];
      });
      this.setState({ deadline: this.props.deadline });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setupCanvas();
      this._drawBackground();
      this.initializeClock();
    }
  }, {
    key: '_getTime',
    value: function _getTime(endtime) {
      var total = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor(total / 1000 % 60);
      var minutes = Math.floor(total / 1000 / 60 % 60);
      var hours = Math.floor(total / (1000 * 60 * 60) % 24);
      var days = Math.floor(total / (1000 * 60 * 60 * 24) % 365);
      var years = Math.floor(total / (1000 * 60 * 60 * 24 * 365));
      return {
        total: total,
        years: years,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var format = this._parseFormat(this._format);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'section',
          {
            id: 'countdown',
            ref: 'countdown' },
          format.day ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('canvas', {
              className: 'react-countdown-clock',
              ref: 'year_canvas',
              width: this.props.size,
              height: this.props.size })
          ) : null,
          format.day ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('canvas', {
              className: 'react-countdown-clock',
              ref: 'day_canvas',
              width: this.props.size,
              height: this.props.size })
          ) : null,
          format.hour ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('canvas', {
              className: 'react-countdown-clock',
              ref: 'hour_canvas',
              width: this.props.size,
              height: this.props.size })
          ) : null,
          format.minute ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('canvas', {
              className: 'react-countdown-clock',
              ref: 'minute_canvas',
              width: this.props.size,
              height: this.props.size })
          ) : null,
          format.second ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('canvas', {
              className: 'react-countdown-clock',
              ref: 'second_canvas',
              width: this.props.size,
              height: this.props.size })
          ) : null
        )
      );
    }
  }]);
  return CountdownClock;
}(_react.Component);

CountdownClock.displayName = 'CountdownClock';
CountdownClock.propTypes = {
  deadline: _react.PropTypes.string.isRequired,
  options: _react.PropTypes.object.isRequired,
  size: _react.PropTypes.string,
  fontSize: _react.PropTypes.number,
  colorFinished: _react.PropTypes.string,
  colorGoing: _react.PropTypes.string,
  textColor: _react.PropTypes.string
};
exports.default = CountdownClock;
