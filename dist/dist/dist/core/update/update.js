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

var _init = require('../../app/init');

var _three = require('three');

var _core = require('../../core');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Update = function () {
  function Update() {
    _classCallCheck(this, Update);

    this.animationFrameId = null;
    this.isRunning = false;
    this.updateQ = [];
    this.clock = new _three.Clock();
    this.__scene = null;
    this.__renderer = null;
    this.__camera = null;
  }

  _createClass(Update, [{
    key: 'start',
    value: function start() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.tick();
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.isRunning = false;
      cancelAnimationFrame(this.animationFrameId);
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.animationFrameId = requestAnimationFrame(this.tick.bind(this));
      this.update();
      this.render();
      _core.frustum.update();
    }
  }, {
    key: 'update',
    value: function update() {
      var delta = this.clock.getDelta();
      this.updateQ.forEach(function (element) {
        return element.update(delta);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      this.__renderer.render(this.__scene, this.__camera);
    }
  }, {
    key: 'add',
    value: function add(toUpdate) {
      if (toUpdate instanceof _core.Behavior) {
        this.updateQ.push(toUpdate);
      }
    }
  }, {
    key: 'remove',
    value: function remove(toRemove) {
      _core.util.removeBehaviorFromArray(toRemove, this.updateQ);
    }
  }, {
    key: 'renderer',
    set: function set(renderer) {
      if (renderer instanceof _init.Renderer) {
        this.__renderer = renderer;
      }
    }
  }, {
    key: 'scene',
    set: function set(scene) {
      if (scene instanceof _init.Scene) {
        this.__scene = scene.scene;
        this.__camera = scene.camera;
        _core.frustum.camera = scene.camera;
      }
    }
  }]);

  return Update;
}();

exports.default = new Update();