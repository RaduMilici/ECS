'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _entity = require('../entity');

var _entity2 = _interopRequireDefault(_entity);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _random = require('../random');

var _random2 = _interopRequireDefault(_random);

var _vertex_shader = require('./shaders/vertex_shader');

var _vertex_shader2 = _interopRequireDefault(_vertex_shader);

var _fragment_shader = require('./shaders/fragment_shader');

var _fragment_shader2 = _interopRequireDefault(_fragment_shader);

var _move_particles = require('./components/move_particles.component');

var _move_particles2 = _interopRequireDefault(_move_particles);

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
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ParticleMaterial = function (_ShaderMaterial) {
  _inherits(ParticleMaterial, _ShaderMaterial);

  function ParticleMaterial() {
    _classCallCheck(this, ParticleMaterial);

    var _this = _possibleConstructorReturn(this, (ParticleMaterial.__proto__ || Object.getPrototypeOf(ParticleMaterial)).call(this));

    _this.vertexShader = _vertex_shader2.default;
    _this.fragmentShader = _fragment_shader2.default;
    _this.uniforms = {
      time: { type: 'f', value: 0 },
      direction: { type: 'v3', value: new _three.Vector3(0, -1, 0) },
      cage: { type: 'v3', value: new _three.Vector3(15, 15, 2) }
    };
    _this.blending = _three.AdditiveBlending;
    return _this;
  }

  return ParticleMaterial;
}(_three.ShaderMaterial);

var Particles = function (_Entity) {
  _inherits(Particles, _Entity);

  function Particles() {
    _classCallCheck(this, Particles);

    var _this2 = _possibleConstructorReturn(this, (Particles.__proto__ || Object.getPrototypeOf(Particles)).call(this));

    _this2.components = [_move_particles2.default];
    _this2.count = 100;
    _this2.particleMaterial = new ParticleMaterial();
    var geometry = new _three.Geometry();
    var rndX = { min: -15, max: 15 };
    var rndY = { min: -15, max: 15 };
    var rndZ = { min: -2, max: 2 };
    _util2.default.times(function () {
      return geometry.vertices.push(_random2.default.position(rndX, rndY, rndZ));
    }, _this2.count);
    _this2.add(new _three.Points(geometry, _this2.particleMaterial));
    return _this2;
  }

  _createClass(Particles, [{
    key: 'start',
    value: function start() {
      this.components.MoveParticles.speed = 10;
    }
  }]);

  return Particles;
}(_entity2.default);

exports.default = Particles;