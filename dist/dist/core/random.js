'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _three = require('three');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Random = function () {
  function Random() {
    _classCallCheck(this, Random);
  }

  _createClass(Random, null, [{
    key: 'color',
    value: function color() {
      return new _three.Color(Math.random() * 0xffffff);
    }
  }, {
    key: 'int',
    value: function int(min, max) {
      return Math.round(Random.float(min, max));
    }
  }, {
    key: 'float',
    value: function float() {
      var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.MIN_SAFE_INTEGER;
      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_SAFE_INTEGER;

      return Math.random() * (max - min) + min;
    }
  }, {
    key: 'position',
    value: function position() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { min: -10, max: 10 };
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { min: -10, max: 10 };
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { min: -10, max: 10 };

      return new _three.Vector3(Random.float(x.min, x.max), Random.float(y.min, y.max), Random.float(z.min, z.max));
    }
  }]);

  return Random;
}();

exports.default = Random;