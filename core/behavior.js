'use strict'
let systems = require('../systems');
let injector = systems.injector;
let updater = systems.updater;
let loader = systems.loader;
let util = systems.util;

module.exports = class Behavior{
//------------------------------------------------------------------------------
  constructor(){
    this.id = util.UniqueID();
    this.injector = injector;
    this.updater = updater;
    this.loader = loader; 
    this.Start = util.CreateInterceptor(this, this._preStart, this.Start);
    this.Stop = util.CreateInterceptor(this, this._preStop, this.Stop);
    this.updater.Add(this);
  }
//------------------------------------------------------------------------------  
  Awake(){

  }
//------------------------------------------------------------------------------ 
  Stop(){
    this.active = false;
    this.updater.Remove(this);
  }
//------------------------------------------------------------------------------ 
//////////// 
//INTERNAL//
////////////
//interceptors------------------------------------------------------------------  
  _preStart(){ 
    this.active = true;
  }
//------------------------------------------------------------------------------ 
  _preStop(){ 
    this.active = false;
  }
//------------------------------------------------------------------------------ 
}

