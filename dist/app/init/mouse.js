'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var _core = require('../../core');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mouse = function () {
  function Mouse() {
    _classCallCheck(this, Mouse);

    this.container = null;
    this.position = new _three.Vector2();
    this.onMouseDownEntityes = [];
  }

  _createClass(Mouse, [{
    key: 'start',
    value: function start() {
      this.container.addEventListener('mousemove', this.onMouseMove.bind(this), false);
      this.container.addEventListener('mousedown', this.onMouseDown.bind(this), false);
      _core.raycaster.mouse = this.position;
    }
  }, {
    key: 'registerEntityEvents',
    value: function registerEntityEvents(entity) {
      if (entity.onMouseDown) {
        this.addOnMouseDown(entity);
      }

      if (entity.onClick) {
        _core.raycaster.addOnClick(entity);
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {
      this.position.x = event.clientX / this.container.clientWidth * 2 - 1;
      this.position.y = -(event.clientY / this.container.clientHeight) * 2 + 1;
    }
  }, {
    key: 'addOnMouseDown',
    value: function addOnMouseDown(entity) {
      if (entity instanceof _core.Entity) {
        this.onMouseDownEntityes.push(entity);
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(event) {
      // called when user presses mouse button anywhere in the app
      var intersects = _core.raycaster.castFromCamera();
      this.onMouseDownEntityes.forEach(function (e) {
        return e.onMouseDown(event, intersects);
      });
    }
  }]);

  return Mouse;
}();

exports.default = new Mouse();