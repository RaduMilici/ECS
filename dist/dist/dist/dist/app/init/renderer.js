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

var defaultSettings = {
  width: 256,
  height: 256
};

var Renderer = function () {
  function Renderer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSettings,
        width = _ref.width,
        height = _ref.height;

    var container = arguments[1];

    _classCallCheck(this, Renderer);

    this.renderer = new _three.WebGLRenderer({ preserveDrawingBuffer: true });
    this.renderer.setSize(width, height);
    container.append(this.renderer.domElement);
  }

  _createClass(Renderer, [{
    key: 'render',
    value: function render(scene, camera) {
      this.renderer.render(scene, camera);
    }
  }, {
    key: 'screenshot',
    value: function screenshot() {
      var mime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'image/jpeg';

      return this.renderer.domElement.toDataURL(mime);
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;