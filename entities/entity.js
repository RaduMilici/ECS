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

