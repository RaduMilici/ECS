'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _behavior = require('./behavior');

var _behavior2 = _interopRequireDefault(_behavior);

var _injector = require('./injector');

var _injector2 = _interopRequireDefault(_injector);

var _update = require('./update');

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function (_Behavior) {
  _inherits(Component, _Behavior);

  function Component() {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

    _this.__ecs.injector = _injector2.default;
    _this.start = _util2.default.createInterceptor(_this, _this.__start, _this.start);
    _this.stop = _util2.default.createInterceptor(_this, _this.__stop, _this.stop);
    _this.update = _util2.default.createInterceptor(_this, _this.__update, _this.update);
    return _this;
  }

  _createClass(Component, [{
    key: '__start',
    value: function __start() {
      _update.update.add(this);
    }
  }, {
    key: '__stop',
    value: function __stop() {
      _update.update.remove(this);
    }
  }, {
    key: '__update',
    value: function __update() {}
  }]);

  return Component;
}(_behavior2.default);

exports.default = Component;