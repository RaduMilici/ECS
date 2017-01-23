//can be extended for use with ECS
let Component = require('./components').Component;
let Entity = require('./entities').Entity;
//------------------------------------------------------------------------------
//internal systems, exposed for customization
let systems = require('./systems');
//------------------------------------------------------------------------------
let Start = systems.updater.Start.bind(systems.updater);
let Stop = systems.updater.Stop.bind(systems.updater);
//------------------------------------------------------------------------------
//use this to load entities, uses the injector internally 
let LoadEntity = systems.injector.LoadEntity.bind(systems.injector);
//------------------------------------------------------------------------------
//layers
let ToggleLayer = systems.sceneData.ToggleLayer.bind(systems.sceneData);
let CallOnLayer = systems.sceneData.CallOnLayer.bind(systems.sceneData);
//------------------------------------------------------------------------------
/*
  WARNING: choose only one of the following, do NOT do doth:
  1: pass your render function to 'ECS.SetRenderFunction' to draw internally 
     after all entities/components update. this is the preferred way.
  2: handle the render loop externally and run ECS.Update() there while passing
     the 'requestAnimationFrame' timestamp as an argument
*/
let SetRenderFunction = systems.updater.SetRenderFunction.bind(systems.updater);
let Update = systems.updater.Update.bind(systems.updater);
//------------------------------------------------------------------------------
let Util = systems.util;
//------------------------------------------------------------------------------
module.exports = { 
  Start, Stop,
  Entity, Component, systems, 
  LoadEntity, 
  ToggleLayer, CallOnLayer,
  SetRenderFunction, Update,
  Util 
};
//------------------------------------------------------------------------------