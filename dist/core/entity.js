'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var _behavior = require('./behavior');

var _behavior2 = _interopRequireDefault(_behavior);

var _injector = require('./injector');

var _injector2 = _interopRequireDefault(_injector);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _frustum = require('./frustum');

var _frustum2 = _interopRequireDefault(_frustum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entity = function (_Behavior) {
  _inherits(Entity, _Behavior);

  function Entity() {
    _classCallCheck(this, Entity);

    var _this = _possibleConstructorReturn(this, (Entity.__proto__ || Object.getPrototypeOf(Entity)).call(this));

    _this.components = [];
    _this.__extendObject3D();
    _this.__assignEntityProperties();
    _this.start = _util2.default.createInterceptor(_this, _this.__start, _this.start);
    _this.__checkOnLeaveFrustum();
    _this.__ecs.layer = 'global';
    return _this;
  }

  _createClass(Entity, [{
    key: '__start',
    value: function __start() {
      /*
      * Transfer component classes here for internal use.
      * this.components -> this.__ecs.components
      *
      * 'this.components' will become an object with
      * instantiated objects from those classes.
      * */
      this.__ecs.components = this.components;
      _injector2.default.registerEntity(this);
    }
  }, {
    key: '__extendObject3D',
    value: function __extendObject3D() {
      // allows to manipulate an entity just like a THREE.Object3D
      _three.Object3D.call(this);
      Object.assign(this, _three.Object3D, _three.Object3D.prototype, _three.EventDispatcher, _three.EventDispatcher.prototype);
    }
  }, {
    key: '__assignEntityProperties',
    value: function __assignEntityProperties() {
      // set some references to the __ecs object for internal use
      var entityProperties = {
        injector: _injector2.default,
        components: [],
        meshes: []
      };
      Object.assign(this.__ecs, entityProperties);
    }
  }, {
    key: '__checkOnLeaveFrustum',
    value: function __checkOnLeaveFrustum() {
      if (typeof this.onLeaveFrustum === 'function') {
        _frustum2.default.add(this);
      }
    }
  }, {
    key: 'layer',
    get: function get() {
      return this.__ecs.layer;
    },
    set: function set(layer) {
      this.__ecs.layer = layer;
    }
  }]);

  return Entity;
}(_behavior2.default);

exports.default = Entity;