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