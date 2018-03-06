'use strict';

var _typeof4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof3 = typeof Symbol === "function" && _typeof4(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof4(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof4(obj);
};

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _component = require('../../component');

var _component2 = _interopRequireDefault(_component);

var _three = require('three');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MoveParticles = function (_Component) {
  _inherits(MoveParticles, _Component);

  function MoveParticles() {
    _classCallCheck(this, MoveParticles);

    var _this = _possibleConstructorReturn(this, (MoveParticles.__proto__ || Object.getPrototypeOf(MoveParticles)).call(this));

    _this.name = 'MoveParticles';
    _this.velocity = new _three.Vector3();
    _this._direction = new _three.Vector3();
    _this._speed = 0;
    return _this;
  }

  _createClass(MoveParticles, [{
    key: 'updateVelocity',
    value: function updateVelocity() {
      this.velocity = this._direction.clone().multiplyScalar(this._speed);
    }
  }, {
    key: 'update',
    value: function update(delta) {
      this.entity.particleMaterial.uniforms.time.value += this._speed * delta;
    }
  }, {
    key: 'speed',
    set: function set(s) {
      if (typeof s === 'number') {
        this._speed = s;
        this.updateVelocity();
      }
    }
  }, {
    key: 'direction',
    set: function set(v) {
      if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
        this._direction.copy(v);
        this.updateVelocity();
      }
    }
  }]);

  return MoveParticles;
}(_component2.default);

exports.default = MoveParticles;