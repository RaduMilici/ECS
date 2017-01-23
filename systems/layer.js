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