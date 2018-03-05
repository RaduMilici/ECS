"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (settings) {
  return new Promise(function (resolve) {
    new InvokeRepeating(settings).invoke(resolve);
  });
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InvokeRepeating = function () {
  function InvokeRepeating(_ref) {
    var func = _ref.func,
        _ref$interval = _ref.interval,
        interval = _ref$interval === undefined ? 1000 : _ref$interval,
        _ref$times = _ref.times,
        times = _ref$times === undefined ? Infinity : _ref$times;

    _classCallCheck(this, InvokeRepeating);

    Object.assign(this, { func: func, interval: interval, times: times });
    this.__timesInvoked = 0;
  }

  _createClass(InvokeRepeating, [{
    key: "invoke",
    value: function invoke(resolve) {
      var _this = this;

      setTimeout(function () {
        if (++_this.__timesInvoked <= _this.times) {
          requestAnimationFrame(_this.invoke.bind(_this, resolve));
          _this.func(_this.__timesInvoked);
        } else {
          resolve();
        }
      }, this.interval);
    }
  }]);

  return InvokeRepeating;
}();