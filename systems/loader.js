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