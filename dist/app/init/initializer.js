'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = require('../../core');

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _scene = require('./scene');

var _scene2 = _interopRequireDefault(_scene);

var _mouse = require('./mouse');

var _mouse2 = _interopRequireDefault(_mouse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Init = function () {
  function Init(application) {
    _classCallCheck(this, Init);

    this.application = application;
  }

  _createClass(Init, [{
    key: 'init',
    value: function init(settings) {
      var container = this.getContainer(settings);
      this.application.renderer = new _renderer2.default(settings, container);
      this.application.scene = new _scene2.default(settings);
      this.application.camera = this.application.scene.camera;
      this.application.raycaster = _core.raycaster;
      this.application.raycaster.camera = this.application.camera;
      this.application.mouse = _mouse2.default;
      this.application.mouse.container = container;

      _core.update.scene = this.application.scene;
      _core.update.renderer = this.application.renderer;

      this.application.mouse.start();
      _core.update.start();
    }
  }, {
    key: 'getContainer',
    value: function getContainer(settings) {
      return settings.containerId ? document.getElementById(settings.containerId) : document.body;
    }
  }]);

  return Init;
}();

exports.default = Init;