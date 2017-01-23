(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
let loader = systems.loader;
let util = systems.util;

module.exports = class Behavior{
//------------------------------------------------------------------------------
  constructor(){
    this.id = util.UniqueID();
    this.injector = injector;
    this.updater = updater;
    this.loader = loader; 
    this.Start = util.CreateInterceptor(this, this._preStart, this.Start);
    this.Stop = util.CreateInterceptor(this, this._preStop, this.Stop);
    this.updater.Add(this);
  }
//------------------------------------------------------------------------------  
  Awake(){

  }
//------------------------------------------------------------------------------ 
  Stop(){
    this.active = false;
    this.updater.Remove(this);
  }
//------------------------------------------------------------------------------ 
//////////// 
//INTERNAL//
////////////
//interceptors------------------------------------------------------------------  
  _preStart(){ 
    this.active = true;
  }
//------------------------------------------------------------------------------ 
  _preStop(){ 
    this.active = false;
  }
//------------------------------------------------------------------------------ 
}


},{"../systems":11}],4:[function(require,module,exports){
'use strict'
let Behavior = require('../core/behavior');
let Component = require('../components').Component;

module.exports = class Entity extends Behavior{
//------------------------------------------------------------------------------
  constructor(settings){
    super();
    // inherit from THREE.Object3D
    THREE.Object3D.call(this);
    Object.assign(this, THREE.Object3D, THREE.Object3D.prototype);
    // entity specific
    this.meshes = settings.meshes || [];
    this.components = settings.components || {};
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
  RemoveComponent(component){
    
  }
//------------------------------------------------------------------------------  
  LoadMesh(name){
    let scope = this;
    return new Promise(function(resolve, reject){
      scope.loader.LoadJSON(name).then(function(mesh){
        scope.add(mesh);
        resolve(mesh);
      });
    });
  }
//------------------------------------------------------------------------------
  Stop(){
    this._stopAllComponents();
  }
//------------------------------------------------------------------------------
//////////// 
//INTERNAL//
////////////
//------------------------------------------------------------------------------ 
  _stopAllComponents(){
    for (var property in this.components) 
      if ( this.components.hasOwnProperty(property)) 
        if(typeof this.components[property].Stop === 'function')
          this.components[property].Stop();  
  }
//------------------------------------------------------------------------------  
}


},{"../components":2,"../core/behavior":3}],5:[function(require,module,exports){
let Entity = require('./entity');

module.exports = { Entity }; 
},{"./entity":4}],6:[function(require,module,exports){
let Component = require('./components').Component;
let Entity = require('./entities').Entity;
let systems = require('./systems');

let Start = systems.updater.Start.bind(systems.updater);
let Stop = systems.updater.Stop.bind(systems.updater);

let LoadEntity = systems.injector.LoadEntity.bind(systems.injector);
//layers
let ToggleLayer = systems.sceneData.ToggleLayer.bind(systems.sceneData);
let CallOnLayer = systems.sceneData.CallOnLayer.bind(systems.sceneData);

let SetRenderFunction = systems.updater.SetRenderFunction.bind(systems.updater);
let Util = systems.util;

module.exports = { 
  Start, Stop,
  Entity, Component, systems, 
  LoadEntity, 
  ToggleLayer, CallOnLayer,
  SetRenderFunction, 
  Util 
};
},{"./components":2,"./entities":5,"./systems":11}],7:[function(require,module,exports){
'use strict'

let rotate = require('./rotate');
let scale = require('./scale');

module.exports = class Cube extends ECS.Entity{
//------------------------------------------------------------------------------
  constructor(){ 
    var meshes = [/*'monster'*/];
    super({meshes});
    this.layer = this.color = ECS.Util.RandomColor();
    this.addCube();
  }
//------------------------------------------------------------------------------
  Start(settings){
    if(settings && settings.pos)
      this.position.copy(settings.pos);
    //this.meshes.monster.scale.setScalar(0.001);
    this.AddComponent(rotate);
    this.AddComponent(scale);
    this.components.rotate.SetSpinVector(new THREE.Vector3(0.01, 0.01, 0.01));
  }
//------------------------------------------------------------------------------
  addCube(){
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshLambertMaterial( { color: this.color } );
    let mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = false;
    this.add( mesh );
  }
//------------------------------------------------------------------------------
}
},{"./rotate":9,"./scale":10}],8:[function(require,module,exports){
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
let renderer = new THREE.WebGLRenderer();
let controls = new THREE.OrbitControls( camera, renderer.domElement );
let side = 50;  
let middle = new THREE.Vector3(side / 2, 0, side / 2);

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );
controls.target.copy(middle);
camera.position.set(37, 32, -20);
camera.lookAt(controls.target);
//------------------------------------------------------------------------------
window.ECS = require('../');
let Cube = require('./cube'); 
start();
//------------------------------------------------------------------------------
function start(){
  makeScene();
  for (var i = 0; i < side; i++)
    for(let j = 0; j < side; j += 5)
      loadCube(i, Math.sin(i) + j);
} 
//------------------------------------------------------------------------------ 
function loadCube(x, z){
  let settings = {pos: new THREE.Vector3(x, 0, z)}
  ECS.LoadEntity(Cube, settings).then(scene.add.bind(scene));
}
//------------------------------------------------------------------------------ 
function makeScene(){
  //plane
  let geom = new THREE.PlaneGeometry(side * 2, side * 2);
  let mesh = new THREE.Mesh(geom, new THREE.MeshLambertMaterial());
  mesh.position.set(middle.x, -1, middle.z);
  mesh.rotation.x -= Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);
  //light
  var light = new THREE.DirectionalLight(0xD9E9FF);
  light.position.set(0, 50, 0);
  light.shadow.camera.right = light.shadow.camera.top = side;
  light.shadow.camera.left = light.shadow.camera.bottom = -side;
  light.shadow.mapSize.width = light.shadow.mapSize.height = 1024;
  light.castShadow = true;
  scene.add( light );
}
//------------------------------------------------------------------------------ 
ECS.SetRenderFunction(function(){ renderer.render(scene, camera); });
ECS.Start();
//------------------------------------------------------------------------------

},{"../":6,"./cube":7}],9:[function(require,module,exports){
'use strict'

module.exports = class Rotate extends ECS.Component{
//------------------------------------------------------------------------------
  constructor(entity){
    super(entity);
    this.name = 'rotate';
    this.spinVector = new THREE.Vector3();
  }
//------------------------------------------------------------------------------  
  SetSpinVector(vector){ 
    this.spinVector = vector;   
  }
//------------------------------------------------------------------------------  
  Update(time){ 
    this.entity.rotation.x += this.spinVector.x;
    this.entity.rotation.y += this.spinVector.y;
    this.entity.rotation.z += this.spinVector.z;
  }
//------------------------------------------------------------------------------  
}

},{}],10:[function(require,module,exports){
'use strict'

module.exports = class Scale extends ECS.Component{
//------------------------------------------------------------------------------
  constructor(entity){
    super(entity);
    this.name = 'scale';
    this.speed = 0.05;
  }
//------------------------------------------------------------------------------  
  Update(time){ 
    let num = time * 0.01 + this.entity.position.x + this.entity.position.z;
    let scale = Math.abs(Math.sin(num * this.speed));
    this.entity.scale.setScalar(scale);
    this.entity.position.y = scale * 10;
  }
//------------------------------------------------------------------------------  
}


},{}],11:[function(require,module,exports){
'use strict'
let injector = require('./injector');
let updater = require('./updater');
let util = require('./util');
let loader = require('./loader');
let sceneData = require('./scenedata');
let Layer = require('./layer');

module.exports = { injector, updater, util, loader, sceneData, Layer };
},{"./injector":12,"./layer":13,"./loader":14,"./scenedata":15,"./updater":16,"./util":17}],12:[function(require,module,exports){
'use strict';

let sceneData = require('./scenedata');
//------------------------------------------------------------------------------

class Injector{
//------------------------------------------------------------------------------
  constructor(){}
//------------------------------------------------------------------------------
  LoadEntity(entity, settings){
    let scope = this;

    function load(resolve, reject) {
      let instance = new entity();
      scope.LoadEntityMeshes(instance)
      .then(function(){
        sceneData.AddToLayer(instance);
        if(typeof instance.Start === 'function') instance.Start(settings);          
        resolve(instance);
      });
    }

    return new Promise(load);
  }
//------------------------------------------------------------------------------
  LoadEntityMeshes(instance){
    let meshPs = [];
    let loadedMeshes = {};
    
    function load(resolve, reject){
      instance.meshes.forEach(function(meshName){
        let meshP = instance.LoadMesh(meshName);
        meshP.then(function(mesh){ loadedMeshes[meshName] = mesh; })
        meshPs.push(meshP);  
      });

      Promise.all(meshPs).then(function(){
        //replace array of strings with object with properties of loaded meshes
        instance.meshes = loadedMeshes;
        resolve(instance);
      });
    }

    return new Promise(load);
  }
//------------------------------------------------------------------------------
}

module.exports = new Injector();
},{"./scenedata":15}],13:[function(require,module,exports){
'use strict'

module.exports = class Layer{
//------------------------------------------------------------------------------
  constructor(){
    this.meshes = [];
    this.visible = true;
  }
//------------------------------------------------------------------------------
  SetVisibility(bool){
    // if no bool is provided, just toogle it
    bool = bool || !this.visible;

    this.visible = bool;
    this.CallOnMeshes(function(mesh){ mesh.visible = bool; })
  }
//------------------------------------------------------------------------------
  CallOnMeshes(func){
    this.meshes.forEach(function(mesh){ func(mesh) });
  }
//------------------------------------------------------------------------------
}
},{}],14:[function(require,module,exports){
'use strict'
class Loader{
//------------------------------------------------------------------------------
  constructor(){
    this.assetsPath = '../assets/';
    this.meshesPath = 'meshes/';
    this.JSONLoader = new THREE.JSONLoader();
  }
//------------------------------------------------------------------------------
  LoadJSON(name, onLoad, onProgress, onError){
    let scope = this;
    let url = `${scope.assetsPath}${scope.meshesPath}/${name}.json`;

    function load(resolve, reject){
      scope.JSONLoader.load(url, function(geometry, materials){
        let material = new THREE.MultiMaterial( materials );
		    let object = new THREE.Mesh( geometry, material );
        if(typeof onLoad === 'function') onLoad(object);
        resolve(object);
      }, onProgress, onError);
    }
    
    return new Promise(load);
  }
//------------------------------------------------------------------------------
}

module.exports = new Loader();
},{}],15:[function(require,module,exports){
'use strict'

let Layer = require('./layer');

class SceneData{

//------------------------------------------------------------------------------
  constructor(){
    this.layers = {};
  }
//------------------------------------------------------------------------------
  AddToLayer(entity, layer){
    // either specify a layer or extract it from entity
    layer = layer || entity.layer;

    // neither, do nothing
    if(layer === undefined) return;

    let selectedLayer = this.layers[layer];

    if(selectedLayer === undefined)
      selectedLayer = this.layers[layer] = new Layer();      

    selectedLayer.meshes.push(entity);
  }
//------------------------------------------------------------------------------
  ToggleLayer(layer, bool){
    let selectedLayer = this.layers[layer];

    if(selectedLayer === undefined)
      return;
    
    selectedLayer.SetVisibility(bool);
  }
//------------------------------------------------------------------------------
  CallOnLayer(layer, func){
    if(layer === undefined || typeof func !== 'function') return;

    let selectedLayer = this.layers[layer];

    if(selectedLayer === undefined) return;

    selectedLayer.CallOnMeshes(func);

  }
//------------------------------------------------------------------------------
}

module.exports = new SceneData();
},{"./layer":13}],16:[function(require,module,exports){
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
  Update(time){
    this.frameID = requestAnimationFrame(this.Update.bind(this));

    this.objects.forEach(function(obj) {
      obj.Update(time);
    });

    this.renderFunction();
  }
//------------------------------------------------------------------------------
  Invoke(func, ms){

  }
//------------------------------------------------------------------------------

}

module.exports = new Updater();
},{}],17:[function(require,module,exports){
'use strict'
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
  CreateInterceptor(scope, pre, original, post){
    if(scope === undefined || typeof original !== 'function') return;

    let blank = function(){};
    pre = pre || blank;
    post = post || blank;

    return function(settings){
      pre.bind(scope)();
      original.bind(scope)(settings);
      post.bind(scope)();
    };
  }
//------------------------------------------------------------------------------
  RandomColor(){
    let colors = ['red', 'green', 'blue'];
    return colors[Math.round(Math.random() * (colors.length - 1))];
  }
//------------------------------------------------------------------------------
}

module.exports = new Util();
},{}]},{},[8])