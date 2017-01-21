'use strict'
let Behavior = require('../core/behavior');

module.exports = class Entity extends Behavior{
//------------------------------------------------------------------------------
  constructor(){
    super();
    // inherit from THREE.Object3D
    THREE.Object3D.call(this);
    Object.assign(this, THREE.Object3D, THREE.Object3D.prototype);
    //entity specific arrays
    this.meshes = [];
    this.components = [];
  }
//------------------------------------------------------------------------------  
  Awake(){

  }
//------------------------------------------------------------------------------  
  dispatchEvent(){

  }
//------------------------------------------------------------------------------  
}

