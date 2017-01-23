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