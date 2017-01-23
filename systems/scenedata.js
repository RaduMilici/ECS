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