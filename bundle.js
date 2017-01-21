(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'
let Behavior = require('../core/behavior');

module.exports = class Component extends Behavior{
//------------------------------------------------------------------------------
  constructor(entity){
    super();
    this.entity = entity;
  }
//------------------------------------------------------------------------------  
  Awake(){

  }
//------------------------------------------------------------------------------ 
  Update(){
    
  }
//------------------------------------------------------------------------------  
}


},{"../core/behavior":3}],2:[function(require,module,exports){
let Component = require('./component');

module.exports = { Component };
},{"./component":1}],3:[function(require,module,exports){
'use strict'
let systems = require('../systems');
let injector = systems.injector;
let updater = systems.updater;
let util = systems.util;

module.exports = class Behavior{
//------------------------------------------------------------------------------
  constructor(){
    this.id = util.UniqueID();
    this.injector = injector;
    this.updater = updater;
    
    this.updater.Add(this);
  }
//------------------------------------------------------------------------------  
  Awake(){

  }
//------------------------------------------------------------------------------  
}


},{"../systems":10}],4:[function(require,module,exports){
'use strict'
let ECS = require('./');
let rotate = require('./rotate');

module.exports = class Cube extends ECS.Entity{
//------------------------------------------------------------------------------
  constructor(x = 0, y = 0, z = 0){
    super();
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } );
    let cube = new THREE.Mesh( geometry, material );
    this.position.set(x, y, z);
    this.add( cube );
  }
//------------------------------------------------------------------------------
}
},{"./":7,"./rotate":9}],5:[function(require,module,exports){
'use strict'
let Behavior = require('../core/behavior');
let Component = require('../components').Component;

module.exports = class Entity extends Behavior{
//------------------------------------------------------------------------------
  constructor(){
    super();
    // inherit from THREE.Object3D
    THREE.Object3D.call(this);
    Object.assign(this, THREE.Object3D, THREE.Object3D.prototype);
    // entity specific
    this.meshes = [];
    this.components = {};
  }
//------------------------------------------------------------------------------  
  Awake(){

  }
//------------------------------------------------------------------------------  
  AddComponent(component){
    if(component instanceof Component === false)
    if(typeof component === 'function')
      component = new component(this);

    this.components[component.name] = component;
    component.entity = this;

    if(typeof component.Start === 'function')
      component.Start(this);
  }
//------------------------------------------------------------------------------  
}


},{"../components":2,"../core/behavior":3}],6:[function(require,module,exports){
let Entity = require('./entity');

module.exports = { Entity }; 
},{"./entity":5}],7:[function(require,module,exports){
let systems = require('./systems');
let Component = require('./components').Component;
let Entity = require('./entities').Entity;

//systems.updater.Start();

module.exports = { Entity, Component, systems };
},{"./components":2,"./entities":6,"./systems":10}],8:[function(require,module,exports){
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//------------------------------------------------------------------------------
let ECS = require('./');
let Cube = require('./cube');
let Rotate = require('./rotate');

for(let i = 0; i < 1; i++){
  let cube = new Cube();
  let rotate = new Rotate(cube);
  scene.add(cube);
}  

camera.position.z = 10;
//------------------------------------------------------------------------------

function render(){
  renderer.render(scene, camera);
}

ECS.systems.updater.SetRenderFunction(render);
ECS.systems.updater.Start();

},{"./":7,"./cube":4,"./rotate":9}],9:[function(require,module,exports){
'use strict'
let ECS = require('./');

module.exports = class Rotate extends ECS.Component{
//------------------------------------------------------------------------------
  constructor(entity){
    super(entity);
    this.name = 'rotate';
    this.spinVector = new THREE.Vector3();
  }
//------------------------------------------------------------------------------  
  Start(vector ){
    this.spinVector = vector;
  }
//------------------------------------------------------------------------------  
  Update(){
    this.entity.rotation.x += this.spinVector.x;
    this.entity.rotation.y += this.spinVector.y;
    this.entity.rotation.z += this.spinVector.z;
  }
//------------------------------------------------------------------------------  
}


},{"./":7}],10:[function(require,module,exports){
let injector = require('./injector');
let updater = require('./updater');
let util = require('./util');
let loader = require('./loader');

module.exports = { injector, updater, util, loader };
},{"./injector":11,"./loader":12,"./updater":13,"./util":14}],11:[function(require,module,exports){
'use strict';

let systems = require('./');
let loader = systems.loader;


//------------------------------------------------------------------------------

class Injector{
//------------------------------------------------------------------------------
  constructor(){

  }
//------------------------------------------------------------------------------
  LoadEntity(entity, settings){

    function spawnPromise(resolve, reject){    
      let injected = require(`./${name}`)
    }

    return new Promise(spawnPromise);
  }
//------------------------------------------------------------------------------
}

module.exports = new Injector();
},{"./":10}],12:[function(require,module,exports){
class Loader{
//------------------------------------------------------------------------------
  constructor(){
    this.JSONLoader = new THREE.JSONLoader();
  }
//------------------------------------------------------------------------------
  LoadJSON(name){

  }
//------------------------------------------------------------------------------
}

module.exports = new Loader();
},{}],13:[function(require,module,exports){
"use strict"
class Updater{

//------------------------------------------------------------------------------
  constructor(){
    this.objects = [];
    this.frameID = 0;
    this.renderFunction = function(){
      console.error('no render function specified');
      this.Stop();
    };
  }
//------------------------------------------------------------------------------
  Start(){
    this.Update();
  }
//------------------------------------------------------------------------------
  Stop(){
    cancelAnimationFrame(this.frameID);
  }
//------------------------------------------------------------------------------
  Clear(){
    this.objects.length = 0;
  }
//------------------------------------------------------------------------------
  SetRenderFunction(func){
    if(typeof(func) === 'function')
      this.renderFunction = func;
  }
//------------------------------------------------------------------------------
  /**
   * Adds an object to the update queue.
   * All objects are called in the order they were added and only after is the
   *     scene rendered.
   * Each object MUST have an function called 'Update' or it will not be added.
   *
   * @param {Object} obj object to add to the update queue
   */
  Add(obj){    
    // does obj exist and have an Update?
    if (obj === undefined || typeof(obj.Update) !== 'function')
      return;

    // is it already in the updater?
    if (this.ReturnIndex(obj) !== false)
      return;

    // finally add it
    obj.updaterIndex = this.objects.length;
    this.objects.push(obj);
  }
//------------------------------------------------------------------------------
  /**
   * Removes a handler from the update queue.
   *
   * @param {Object} handler object to remove from the update queue
   */
  Remove(obj) {
    let index = this.ReturnIndex(obj);

    if (index !== false)
      this.objects.splice(index, 1);
  }
//------------------------------------------------------------------------------
  /**
   * Returns the passed object's index in the internal update queue.
   * Will return 'false' if object is not in the update queue.
   *
   * @param {Object} obj objects whose index is searched for
   */
  ReturnIndex(obj) {
    let index = this.objects.indexOf(obj);

    if (index > -1)
      return index;
    else
      return false;
  }
//------------------------------------------------------------------------------
  /**
   * All parameters are expressed in milliseconds.
   *
   * @param {number} delta the ratio of passed time to one second. multiply
   *     updated values by this number to a guaranteed per second update.
   * @param {number} elapsed elapsed time since rendering last frame
   * @param {number} total total time passes since app start
   */
  Update(){
    this.frameID = requestAnimationFrame(this.Update.bind(this));

    this.objects.forEach(function(obj) {
      obj.Update();
    });

    this.renderFunction();
  }
//------------------------------------------------------------------------------
  Invoke(func, ms){

  }
//------------------------------------------------------------------------------

}

module.exports = new Updater();
},{}],14:[function(require,module,exports){
class Util {
//------------------------------------------------------------------------------
  constructor(){
    this.lastID = 0;
  }
//------------------------------------------------------------------------------
  UniqueID(){
    return this.lastID++;
  }
//------------------------------------------------------------------------------
}

module.exports = new Util();
},{}]},{},[8]);
