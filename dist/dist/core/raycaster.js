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

var _Raycaster = function () {
  function _Raycaster() {
    _classCallCheck(this, _Raycaster);

    this.mouse = null;
    this.camera = null;
    this.raycaster = new _three.Raycaster();
    this.layers = {
      global: []
    };
  }

  _createClass(_Raycaster, [{
    key: 'add',
    value: function add(entity) {
      this.addToLayer(entity);
    }
  }, {
    key: 'addOnClick',
    value: function addOnClick(entity) {
      this.addToLayer(entity);
    }
  }, {
    key: 'addToLayer',
    value: function addToLayer(entity) {
      var desiredLayer = entity.layer;
      var selectedLayer = this.layers[desiredLayer];
      if (selectedLayer) {
        selectedLayer.push(entity);
      } else {
        this.layers[desiredLayer] = [entity];
      }
    }
  }, {
    key: 'cast',
    value: function cast(origin, direction) {
      var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'global';

      this.raycaster.set(origin, direction);
      return this.intersectObjects({ layer: layer });
    }
  }, {
    key: 'castFromCamera',
    value: function castFromCamera() {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      var settings = { layer: 'global', onIntersectName: 'onClick' };
      return this.intersectObjects(settings);
    }
  }, {
    key: 'intersectObjects',
    value: function intersectObjects(_ref) {
      var layer = _ref.layer,
          onIntersectName = _ref.onIntersectName;

      var selectedLayer = this.layers[layer];
      if (!selectedLayer) return [];
      var intersects = this.raycaster.intersectObjects(selectedLayer, true);
      this.onIntersect(intersects, onIntersectName);
      return intersects;
    }
  }, {
    key: 'onIntersect',
    value: function onIntersect(intersects, onIntersectName) {
      if (!intersects || !onIntersectName) {
        return;
      }
      intersects.forEach(function (i) {
        var entity = i.object.entity;
        var callback = entity[onIntersectName];
        if (callback) {
          callback.bind(entity)(i);
        } else {
          throw new Error('No method named ' + onIntersectName + ' found on intersected object');
        }
      });
    }
  }]);

  return _Raycaster;
}();

exports.default = new _Raycaster();