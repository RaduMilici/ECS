'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _init = require('../app/init');

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _raycaster = require('./raycaster');

var _raycaster2 = _interopRequireDefault(_raycaster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Injector = function () {
  function Injector() {
    _classCallCheck(this, Injector);

    this.entities = {};
    this.components = {};
    this.meshes = [];
  }

  _createClass(Injector, [{
    key: 'registerEntity',
    value: function registerEntity(entity) {
      this.entities[entity.__ecs.id] = entity;
      entity.components = this.registerAllComponents(entity);
      _raycaster2.default.add(entity);
      _init.mouse.registerEntityEvents(entity);
    }
  }, {
    key: 'registerAllComponents',
    value: function registerAllComponents(entity) {
      return entity.__ecs.components.reduce(function (accumulator, componentClass) {
        var instantiatedComponent = new componentClass();
        instantiatedComponent.entity = entity;
        accumulator[instantiatedComponent.name] = instantiatedComponent;
        return accumulator;
      }, {});
    }
  }, {
    key: 'startEntity',
    value: function startEntity(entity) {
      entity.start();
      this.startComponents(entity);
      entity.children.forEach(function (c) {
        return c.entity = entity;
      });
      return entity;
    }
  }, {
    key: 'startComponents',
    value: function startComponents(entity) {
      _util2.default.loopObjectKeys(entity.components, function (c) {
        return c.start();
      });
    }
  }, {
    key: 'stopComponents',
    value: function stopComponents(entity) {
      _util2.default.loopObjectKeys(entity.components, function (c) {
        return c.stop();
      });
    }
  }]);

  return Injector;
}();

exports.default = new Injector();