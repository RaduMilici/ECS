'use strict'
let systems = require('../systems');
let injector = systems.injector;
let updater = systems.updater;
let util = systems.util;

module.exports = class Behavior{
//------------------------------------------------------------------------------
  constructor(){
    this.id = util.UniqueID();
    this.injector = injector;
    this.updater = updater;
    
    this.updater.Add(this);
  }
//------------------------------------------------------------------------------  
  Awake(){

  }
//------------------------------------------------------------------------------  
}

