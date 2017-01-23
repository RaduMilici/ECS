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

