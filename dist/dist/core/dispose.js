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

var _entity2 = require('./entity');

var _entity3 = _interopRequireDefault(_entity2);

var _three = require('three');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Dispose = function () {
  function Dispose() {
    _classCallCheck(this, Dispose);
  }

  _createClass(Dispose, [{
    key: 'entity',
    value: function entity(_entity) {
      var _this = this;

      if (_entity instanceof _entity3.default === false) {
        return;
      }

      _entity.children.forEach(function (child) {
        child.geometry.dispose();
        _this.disposeAllMaterials(child);
      });
    }
  }, {
    key: 'disposeAllMaterials',
    value: function disposeAllMaterials(mesh) {
      if (mesh.material instanceof _three.MultiMaterial) mesh.material.materials.forEach(this.disposeMaterial);else this.disposeMaterial(mesh.material);
    }
  }, {
    key: 'disposeMaterial',
    value: function disposeMaterial(material) {
      var mapNames = ['map', 'lightMap', 'bumpMap', 'normalMap', 'specularMap'];

      mapNames.forEach(function (mapName) {
        var currentMap = material[mapName];
        if (currentMap) currentMap.dispose();
      });

      material.dispose();
    }
  }]);

  return Dispose;
}();

exports.default = new Dispose();