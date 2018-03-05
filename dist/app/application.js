'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _init = require('./init');

var _three = require('three');

var _core = require('../core');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Application = function () {
  function Application() {
    _classCallCheck(this, Application);

    this.initializer = new _init.Initializer(this);
    this.scenes = {};
    this.renderer = null;
    this.scene = null;
    this.camera = null;
  }

  _createClass(Application, [{
    key: 'init',
    value: function init(settings) {
      this.initializer.init(settings);
    }
  }, {
    key: 'stop',
    value: function stop() {
      _core.update.stop();
    }
  }, {
    key: 'createScene',
    value: function createScene() {
      var scene = this.initializer.createScene();
      this.scene.add(scene);
      this.scenes[scene.__ecs.id] = scene;
      return scene;
    }
  }, {
    key: 'loadScene',
    value: function loadScene(id) {
      var requiredScene = this.scenes[id];
      if (requiredScene) {
        this.scene.add(requiredScene);
      }
    }
  }, {
    key: 'add',
    value: function add(entity) {
      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _three.Vector3();
      var rotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _three.Euler();

      this.scene.add(entity);
      entity.position.copy(position);
      entity.rotation.copy(rotation);
      return _core.injector.startEntity(entity);
    }
  }, {
    key: 'remove',
    value: function remove(entity) {
      _core.dispose.entity(entity);
      _core.injector.stopComponents(entity);
      this.scene.remove(entity);
    }
  }]);

  return Application;
}();

exports.default = new Application();