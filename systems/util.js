'use strict'
class Util {
//------------------------------------------------------------------------------
  constructor(){
    this.lastID = 0;
  }
//------------------------------------------------------------------------------
  UniqueID(){
    return this.lastID++;
  }
//------------------------------------------------------------------------------
  CreateInterceptor(scope, pre, original, post){
    if(scope === undefined || typeof original !== 'function') return;

    let blank = function(){};
    pre = pre || blank;
    post = post || blank;

    return function(settings){
      pre.bind(scope)();
      original.bind(scope)(settings);
      post.bind(scope)();
    };
  }
//------------------------------------------------------------------------------
  RandomColor(){
    let colors = ['red', 'green', 'blue'];
    return colors[Math.round(Math.random() * (colors.length - 1))];
  }
//------------------------------------------------------------------------------
}

module.exports = new Util();