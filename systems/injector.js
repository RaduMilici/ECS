'use strict';

let systems = require('./');
let loader = systems.loader;


//------------------------------------------------------------------------------

class Injector{
//------------------------------------------------------------------------------
  constructor(){

  }
//------------------------------------------------------------------------------
  LoadEntity(entity, settings){

    function spawnPromise(resolve, reject){    
      let injected = require(`./${name}`)
    }

    return new Promise(spawnPromise);
  }
//------------------------------------------------------------------------------
}

module.exports = new Injector();