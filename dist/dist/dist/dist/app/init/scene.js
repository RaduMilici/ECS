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

var _entity = require('../../core/entity');

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var defaultCameraSettings = {
  fov: 75,
  width: 256,
  height: 256,
  near: 0.1,
  far: 1000
};

var _Scene = function () {
  function _Scene() {
    _classCallCheck(this, _Scene);

    this.scene = _Scene.createScene();
    this.camera = _Scene.createCamera();
  }

  _createClass(_Scene, [{
    key: 'add',
    value: function add(entity) {
      if (entity instanceof _entity2.default) {
        this.scene.add(entity);
      }
    }
  }, {
    key: 'remove',
    value: function remove(entity) {
      if (entity instanceof _entity2.default) {
        this.scene.remove(entity);
      }
    }
  }], [{
    key: 'createScene',
    value: function createScene() {
      return new _three.Scene();
    }
  }, {
    key: 'createCamera',
    value: function createCamera() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultCameraSettings,
          fov = _ref.fov,
          width = _ref.width,
          height = _ref.height,
          near = _ref.near,
          far = _ref.far;

      return new _three.PerspectiveCamera(fov, width / height, near, far);
    }
  }]);

  return _Scene;
}();

exports.default = _Scene;