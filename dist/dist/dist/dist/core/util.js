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

var _behavior = require('./behavior');

var _behavior2 = _interopRequireDefault(_behavior);

var _random = require('./random');

var _random2 = _interopRequireDefault(_random);

var _three = require('three');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Util = function () {
  function Util() {
    _classCallCheck(this, Util);

    this.id = 0;
    this.blank = function () {};
  }

  _createClass(Util, [{
    key: 'uniqueID',
    value: function uniqueID() {
      return this.id++;
    }
  }, {
    key: 'times',
    value: function times(func, _times) {
      for (var i = 0; i < _times; i++) {
        func();
      }
    }
  }, {
    key: 'createInterceptor',
    value: function createInterceptor(scope) {
      var pre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.blank;
      var original = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.blank;
      var post = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.blank;

      if (scope === undefined || typeof original !== 'function') {
        return;
      }

      return function (settings) {
        pre.bind(scope)();
        original.bind(scope)(settings);
        post.bind(scope)();
      };
    }
  }, {
    key: 'getTestCube',
    value: function getTestCube() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      var geometry = new _three.BoxGeometry(width, height, depth);
      var material = new _three.MeshBasicMaterial({ color: _random2.default.color() });
      return new _three.Mesh(geometry, material);
    }
  }, {
    key: 'loopObjectKeys',
    value: function loopObjectKeys(object, callback) {
      Object.keys(object).forEach(function (keyName) {
        return callback(object[keyName]);
      });
    }
  }, {
    key: 'removeBehaviorFromArray',
    value: function removeBehaviorFromArray(behavior, array) {
      if (behavior instanceof _behavior2.default === false || Array.isArray(array) === false) {
        return;
      }

      var index = array.findIndex(function (e) {
        return e.__ecs.id === behavior.__ecs.id;
      });
      if (index !== -1) {
        array.splice(index, 1);
      }
    }
  }, {
    key: 'deg2rad',
    value: function deg2rad(deg) {
      return deg * Math.PI / 180;
    }
  }, {
    key: 'rad2deg',
    value: function rad2deg(rad) {
      return rad * 180 / Math.PI;
    }
  }]);

  return Util;
}();

exports.default = new Util();