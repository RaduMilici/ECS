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

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _three = require('three');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var _Frustum = function () {
  function _Frustum() {
    _classCallCheck(this, _Frustum);

    this.frustum = new _three.Frustum();
    this.cameraViewMatrix = new _three.Matrix4();
    this.camera = null;
    this.entities = [];
  }

  _createClass(_Frustum, [{
    key: 'add',
    value: function add(entity) {
      this.entities.push(entity);
    }
  }, {
    key: 'remove',
    value: function remove(entity) {
      _util2.default.removeBehaviorFromArray(entity, this.entities);
    }
  }, {
    key: 'update',
    value: function update() {
      this.updateFrustum();
      this.checkEntities();
    }
  }, {
    key: 'updateFrustum',
    value: function updateFrustum() {
      this.camera.updateMatrixWorld();
      this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld);
      this.cameraViewMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
      this.frustum.setFromMatrix(this.cameraViewMatrix);
    }
  }, {
    key: 'checkEntities',
    value: function checkEntities() {
      for (var i = this.entities.length - 1; i >= 0; i--) {
        var entity = this.entities[i];
        if (this.checkEntityChildren(entity) === false) {
          this.remove(entity);
        }
      }
    }
  }, {
    key: 'checkEntityChildren',
    value: function checkEntityChildren(entity) {
      for (var i = 0; i < entity.children.length; i++) {
        var child = entity.children[i];
        if (this.frustum.intersectsObject(child) === false) {
          entity.onLeaveFrustum(child);
          return false;
        }
      }
      return true;
    }
  }]);

  return _Frustum;
}();

exports.default = new _Frustum();