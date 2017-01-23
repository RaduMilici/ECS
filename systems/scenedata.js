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

    // layer does not exist, first create it
    if(selectedLayer === undefined)
      selectedLayer = this.layers[layer] = new Layer();      

    //then populate it
    selectedLayer.meshes.push(entity);
  }
//------------------------------------------------------------------------------
  ToggleLayer(layer, bool){
    let selectedLayer = this.layers[layer];
    if(selectedLayer !== undefined) selectedLayer.SetVisibility(bool);
  }
//------------------------------------------------------------------------------
  CallOnLayer(layer, func){
    if(layer === undefined || typeof func !== 'function') return;
    let selectedLayer = this.layers[layer];
    if(selectedLayer !== undefined) selectedLayer.CallOnMeshes(func);
  }
//------------------------------------------------------------------------------
}

module.exports = new SceneData();